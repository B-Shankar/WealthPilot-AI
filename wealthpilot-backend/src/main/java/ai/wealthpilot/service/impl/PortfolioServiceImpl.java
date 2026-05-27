package ai.wealthpilot.service.impl;

import ai.wealthpilot.dto.portfolio.*;
import ai.wealthpilot.exception.ApiException;
import ai.wealthpilot.exception.ResourceNotFoundException;
import ai.wealthpilot.mapper.PortfolioMapper;
import ai.wealthpilot.model.entity.*;
import ai.wealthpilot.model.enums.AssetClass;
import ai.wealthpilot.model.enums.RoleName;
import ai.wealthpilot.repository.ClientRepository;
import ai.wealthpilot.repository.PortfolioRepository;
import ai.wealthpilot.repository.UserRepository;
import ai.wealthpilot.service.PortfolioService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PortfolioServiceImpl implements PortfolioService {

    private final PortfolioRepository portfolioRepository;
    private final ClientRepository clientRepository;
    private final UserRepository userRepository;
    private final PortfolioMapper portfolioMapper;

    @Override
    public PortfolioDto getPortfolioById(UUID id, String rmEmail) {
        User rm = getRmUser(rmEmail);
        Portfolio portfolio = portfolioRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Portfolio", "id", id.toString()));

        validateRmOwnership(rm, portfolio.getClient());
        return portfolioMapper.toDto(portfolio);
    }

    @Override
    public List<PortfolioDto> getPortfoliosByClientId(UUID clientId, String rmEmail) {
        User rm = getRmUser(rmEmail);
        Client client = clientRepository.findById(clientId)
                .orElseThrow(() -> new ResourceNotFoundException("Client", "id", clientId.toString()));

        validateRmOwnership(rm, client);
        
        List<Portfolio> portfolios = portfolioRepository.findByClientId(clientId);
        return portfolios.stream()
                .map(portfolioMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<AllocationDto> getPortfolioAllocation(UUID id, String rmEmail) {
        User rm = getRmUser(rmEmail);
        Portfolio portfolio = portfolioRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Portfolio", "id", id.toString()));

        validateRmOwnership(rm, portfolio.getClient());
        
        BigDecimal totalValue = portfolio.getTotalValue() != null ? portfolio.getTotalValue() : BigDecimal.ZERO;
        if (totalValue.compareTo(BigDecimal.ZERO) == 0) {
            return Collections.emptyList();
        }

        Map<AssetClass, BigDecimal> classMap = new HashMap<>();
        for (PortfolioHolding holding : portfolio.getHoldings()) {
            if (holding.getAsset() != null && holding.getCurrentValue() != null) {
                AssetClass assetClass = holding.getAsset().getAssetClass();
                classMap.put(assetClass, classMap.getOrDefault(assetClass, BigDecimal.ZERO).add(holding.getCurrentValue()));
            }
        }

        List<AllocationDto> allocations = new ArrayList<>();
        for (Map.Entry<AssetClass, BigDecimal> entry : classMap.entrySet()) {
            BigDecimal percentage = entry.getValue()
                    .multiply(new BigDecimal("100"))
                    .divide(totalValue, 2, RoundingMode.HALF_UP);
            
            allocations.add(AllocationDto.builder()
                    .name(entry.getKey().name())
                    .value(entry.getValue())
                    .percentage(percentage)
                    .build());
        }

        return allocations;
    }

    @Override
    public RiskAnalyticsDto getPortfolioRiskAnalytics(UUID id, String rmEmail) {
        User rm = getRmUser(rmEmail);
        Portfolio portfolio = portfolioRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Portfolio", "id", id.toString()));

        validateRmOwnership(rm, portfolio.getClient());
        
        BigDecimal totalValue = portfolio.getTotalValue() != null ? portfolio.getTotalValue() : BigDecimal.ZERO;
        
        // Define default risk parameters per asset class
        // EQUITY: beta=1.2, return=12%, vol=16%
        // FIXED_INCOME: beta=0.15, return=5%, vol=4%
        // COMMODITY: beta=0.05, return=8%, vol=12%
        // REAL_ESTATE: beta=0.4, return=7%, vol=10%
        // CASH: beta=0.0, return=3%, vol=0.5%
        // CRYPTO: beta=1.85, return=30%, vol=65%
        
        BigDecimal weightedBeta = BigDecimal.ZERO;
        BigDecimal weightedVol = BigDecimal.ZERO;
        BigDecimal weightedReturn = BigDecimal.ZERO;

        if (totalValue.compareTo(BigDecimal.ZERO) > 0) {
            for (PortfolioHolding holding : portfolio.getHoldings()) {
                if (holding.getAsset() != null && holding.getCurrentValue() != null) {
                    BigDecimal weight = holding.getCurrentValue().divide(totalValue, 4, RoundingMode.HALF_UP);
                    AssetClass ac = holding.getAsset().getAssetClass();

                    BigDecimal assetBeta = getAssetClassBeta(ac);
                    BigDecimal assetVol = getAssetClassVol(ac);
                    BigDecimal assetReturn = getAssetClassReturn(ac);

                    weightedBeta = weightedBeta.add(assetBeta.multiply(weight));
                    weightedVol = weightedVol.add(assetVol.multiply(weight));
                    weightedReturn = weightedReturn.add(assetReturn.multiply(weight));
                }
            }
        } else {
            // default fallback for empty portfolios
            return RiskAnalyticsDto.builder()
                    .portfolioId(id)
                    .beta(BigDecimal.ONE)
                    .sharpeRatio(BigDecimal.ZERO)
                    .standardDeviation(BigDecimal.ZERO)
                    .valueAtRisk95(BigDecimal.ZERO)
                    .maxDrawdown(BigDecimal.ZERO)
                    .historicalReturnYearly(BigDecimal.ZERO)
                    .build();
        }

        // Sharpe Ratio = (Weighted Return - Risk Free Rate (est. 3.5%)) / Weighted Volatility
        BigDecimal rfRate = new BigDecimal("3.5");
        BigDecimal excessReturn = weightedReturn.subtract(rfRate);
        BigDecimal sharpeRatio = BigDecimal.ZERO;
        if (weightedVol.compareTo(BigDecimal.ZERO) > 0) {
            sharpeRatio = excessReturn.divide(weightedVol, 2, RoundingMode.HALF_UP);
        }

        // Parametric Value-at-Risk at 95% = Portfolio Value * (Weighted Volatility * 1.65 - Weighted Return) / 100
        BigDecimal varFactor = weightedVol.multiply(new BigDecimal("1.65")).subtract(weightedReturn);
        if (varFactor.compareTo(BigDecimal.ZERO) < 0) {
            varFactor = BigDecimal.ZERO; // floor at 0 for display
        }
        BigDecimal valueAtRiskVal = totalValue.multiply(varFactor).divide(new BigDecimal("100"), 2, RoundingMode.HALF_UP);

        // Max Drawdown estimation based on volatility
        BigDecimal maxDrawdownEst = weightedVol.multiply(new BigDecimal("0.8")).setScale(2, RoundingMode.HALF_UP);

        return RiskAnalyticsDto.builder()
                .portfolioId(id)
                .beta(weightedBeta.setScale(2, RoundingMode.HALF_UP))
                .sharpeRatio(sharpeRatio)
                .standardDeviation(weightedVol.setScale(2, RoundingMode.HALF_UP))
                .valueAtRisk95(valueAtRiskVal)
                .maxDrawdown(maxDrawdownEst)
                .historicalReturnYearly(weightedReturn.setScale(2, RoundingMode.HALF_UP))
                .build();
    }

    @Override
    public RebalanceResponse simulateRebalance(UUID id, RebalanceRequest request, String rmEmail) {
        User rm = getRmUser(rmEmail);
        Portfolio portfolio = portfolioRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Portfolio", "id", id.toString()));

        validateRmOwnership(rm, portfolio.getClient());
        
        BigDecimal totalValue = portfolio.getTotalValue() != null ? portfolio.getTotalValue() : BigDecimal.ZERO;
        
        // 1. Current Allocations
        List<AllocationDto> currentAllocations = getPortfolioAllocation(id, rmEmail);
        
        // 2. Validate request targets sum up to 1.0 (100%)
        Map<String, BigDecimal> targets = request.getTargetAllocations();
        BigDecimal targetSum = targets.values().stream().reduce(BigDecimal.ZERO, BigDecimal::add);
        if (targetSum.compareTo(new BigDecimal("1.0")) != 0 && targetSum.compareTo(new BigDecimal("100.0")) != 0) {
            throw new ApiException("Target allocation weights must sum to exactly 100% or 1.0", HttpStatus.BAD_REQUEST);
        }

        // Normalize if expressed as percentages (e.g. 60 instead of 0.60)
        Map<String, BigDecimal> normalizedTargets = new HashMap<>();
        for (Map.Entry<String, BigDecimal> entry : targets.entrySet()) {
            BigDecimal val = entry.getValue();
            if (val.compareTo(BigDecimal.ONE) > 0) {
                val = val.divide(new BigDecimal("100"), 4, RoundingMode.HALF_UP);
            }
            normalizedTargets.put(entry.getKey().toUpperCase(), val);
        }

        // 3. Format Target Allocations DTOs
        List<AllocationDto> targetAllocationsDtos = new ArrayList<>();
        for (Map.Entry<String, BigDecimal> entry : normalizedTargets.entrySet()) {
            targetAllocationsDtos.add(AllocationDto.builder()
                    .name(entry.getKey())
                    .value(totalValue.multiply(entry.getValue()).setScale(2, RoundingMode.HALF_UP))
                    .percentage(entry.getValue().multiply(new BigDecimal("100")).setScale(2, RoundingMode.HALF_UP))
                    .build());
        }

        // 4. Proposed Trades Realignment Math
        List<RebalanceResponse.ProposedTradeDto> proposedTrades = new ArrayList<>();
        
        // Group holdings by AssetClass
        Map<AssetClass, List<PortfolioHolding>> holdingsByClass = new HashMap<>();
        for (PortfolioHolding h : portfolio.getHoldings()) {
            if (h.getAsset() != null) {
                AssetClass ac = h.getAsset().getAssetClass();
                holdingsByClass.computeIfAbsent(ac, k -> new ArrayList<>()).add(h);
            }
        }

        // Process each asset class target
        for (AssetClass ac : AssetClass.values()) {
            BigDecimal targetWeight = normalizedTargets.getOrDefault(ac.name(), BigDecimal.ZERO);
            BigDecimal targetVal = totalValue.multiply(targetWeight);
            
            // Current value of this asset class
            BigDecimal currentVal = currentAllocations.stream()
                    .filter(a -> a.getName().equals(ac.name()))
                    .map(AllocationDto::getValue)
                    .findFirst()
                    .orElse(BigDecimal.ZERO);

            BigDecimal drift = targetVal.subtract(currentVal); // Positive = BUY, Negative = SELL
            
            if (drift.compareTo(BigDecimal.ZERO) == 0) {
                continue;
            }

            List<PortfolioHolding> classHoldings = holdingsByClass.getOrDefault(ac, Collections.emptyList());
            
            if (drift.compareTo(BigDecimal.ZERO) > 0) {
                // BUY: If we have holdings, buy more of them proportionally. 
                // If we don't have holdings, but have target > 0, we can add a placeholder or skip.
                if (!classHoldings.isEmpty()) {
                    for (PortfolioHolding h : classHoldings) {
                        BigDecimal holdingWeight = h.getCurrentValue().divide(currentVal, 4, RoundingMode.HALF_UP);
                        BigDecimal tradeAmount = drift.multiply(holdingWeight);
                        BigDecimal currentPrice = h.getAsset().getCurrentPrice();
                        BigDecimal tradeQty = currentPrice.compareTo(BigDecimal.ZERO) > 0 
                                ? tradeAmount.divide(currentPrice, 4, RoundingMode.HALF_UP) : BigDecimal.ZERO;
                        
                        if (tradeAmount.compareTo(new BigDecimal("1.00")) > 0) { // skip tiny fractional dust trades
                            proposedTrades.add(RebalanceResponse.ProposedTradeDto.builder()
                                    .symbol(h.getAsset().getSymbol())
                                    .assetName(h.getAsset().getName())
                                    .assetClass(ac.name())
                                    .action("BUY")
                                    .tradeAmount(tradeAmount.setScale(2, RoundingMode.HALF_UP))
                                    .tradeQuantity(tradeQty)
                                    .currentPrice(currentPrice)
                                    .build());
                        }
                    }
                }
            } else if (drift.compareTo(BigDecimal.ZERO) < 0) {
                // SELL: Sell holdings in this class proportionally.
                BigDecimal absoluteDrift = drift.abs();
                if (!classHoldings.isEmpty() && currentVal.compareTo(BigDecimal.ZERO) > 0) {
                    for (PortfolioHolding h : classHoldings) {
                        BigDecimal holdingWeight = h.getCurrentValue().divide(currentVal, 4, RoundingMode.HALF_UP);
                        BigDecimal tradeAmount = absoluteDrift.multiply(holdingWeight);
                        BigDecimal currentPrice = h.getAsset().getCurrentPrice();
                        BigDecimal tradeQty = currentPrice.compareTo(BigDecimal.ZERO) > 0 
                                ? tradeAmount.divide(currentPrice, 4, RoundingMode.HALF_UP) : BigDecimal.ZERO;

                        if (tradeAmount.compareTo(new BigDecimal("1.00")) > 0) {
                            proposedTrades.add(RebalanceResponse.ProposedTradeDto.builder()
                                    .symbol(h.getAsset().getSymbol())
                                    .assetName(h.getAsset().getName())
                                    .assetClass(ac.name())
                                    .action("SELL")
                                    .tradeAmount(tradeAmount.setScale(2, RoundingMode.HALF_UP))
                                    .tradeQuantity(tradeQty)
                                    .currentPrice(currentPrice)
                                    .build());
                        }
                    }
                }
            }
        }

        return RebalanceResponse.builder()
                .portfolioId(id)
                .currentAllocations(currentAllocations)
                .targetAllocations(targetAllocationsDtos)
                .proposedTrades(proposedTrades)
                .build();
    }

    private User getRmUser(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", email));
    }

    private boolean isAdmin(User user) {
        return user.getRoles().stream()
                .anyMatch(role -> role.getName() == RoleName.ROLE_ADMIN);
    }

    private void validateRmOwnership(User rm, Client client) {
        if (!isAdmin(rm) && !client.getRelationshipManager().getId().equals(rm.getId())) {
            throw new ApiException("Access Denied: You do not manage this client", HttpStatus.FORBIDDEN);
        }
    }

    private BigDecimal getAssetClassBeta(AssetClass ac) {
        return switch (ac) {
            case EQUITY -> new BigDecimal("1.20");
            case FIXED_INCOME -> new BigDecimal("0.15");
            case COMMODITY -> new BigDecimal("0.05");
            case REAL_ESTATE -> new BigDecimal("0.40");
            case CASH -> new BigDecimal("0.00");
            case CRYPTO -> new BigDecimal("1.85");
            default -> BigDecimal.ONE;
        };
    }

    private BigDecimal getAssetClassVol(AssetClass ac) {
        return switch (ac) {
            case EQUITY -> new BigDecimal("16.0");
            case FIXED_INCOME -> new BigDecimal("4.0");
            case COMMODITY -> new BigDecimal("12.0");
            case REAL_ESTATE -> new BigDecimal("10.0");
            case CASH -> new BigDecimal("0.5");
            case CRYPTO -> new BigDecimal("65.0");
            default -> new BigDecimal("10.0");
        };
    }

    private BigDecimal getAssetClassReturn(AssetClass ac) {
        return switch (ac) {
            case EQUITY -> new BigDecimal("12.0");
            case FIXED_INCOME -> new BigDecimal("5.0");
            case COMMODITY -> new BigDecimal("8.0");
            case REAL_ESTATE -> new BigDecimal("7.0");
            case CASH -> new BigDecimal("3.0");
            case CRYPTO -> new BigDecimal("30.0");
            default -> new BigDecimal("8.0");
        };
    }
}
