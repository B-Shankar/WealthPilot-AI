package ai.wealthpilot.mapper;

import ai.wealthpilot.dto.portfolio.HoldingDto;
import ai.wealthpilot.dto.portfolio.PortfolioDto;
import ai.wealthpilot.model.entity.Portfolio;
import ai.wealthpilot.model.entity.PortfolioHolding;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class PortfolioMapper {

    public PortfolioDto toDto(Portfolio portfolio) {
        if (portfolio == null) {
            return null;
        }

        BigDecimal totalVal = portfolio.getTotalValue() != null ? portfolio.getTotalValue() : BigDecimal.ZERO;
        
        List<HoldingDto> holdingDtos = new ArrayList<>();
        if (portfolio.getHoldings() != null) {
            holdingDtos = portfolio.getHoldings().stream()
                    .map(holding -> toHoldingDto(holding, totalVal))
                    .collect(Collectors.toList());
        }

        return PortfolioDto.builder()
                .id(portfolio.getId())
                .name(portfolio.getName())
                .description(portfolio.getDescription())
                .totalValue(totalVal)
                .currency(portfolio.getCurrency())
                .clientId(portfolio.getClient() != null ? portfolio.getClient().getId() : null)
                .clientName(portfolio.getClient() != null ? portfolio.getClient().getFullName() : null)
                .holdings(holdingDtos)
                .build();
    }

    public HoldingDto toHoldingDto(PortfolioHolding holding, BigDecimal portfolioTotalValue) {
        if (holding == null) {
            return null;
        }

        BigDecimal holdingValue = holding.getCurrentValue() != null ? holding.getCurrentValue() : BigDecimal.ZERO;
        BigDecimal allocationPercent = BigDecimal.ZERO;
        
        if (portfolioTotalValue != null && portfolioTotalValue.compareTo(BigDecimal.ZERO) > 0) {
            allocationPercent = holdingValue
                    .multiply(new BigDecimal("100"))
                    .divide(portfolioTotalValue, 2, RoundingMode.HALF_UP);
        }

        return HoldingDto.builder()
                .id(holding.getId())
                .assetId(holding.getAsset() != null ? holding.getAsset().getId() : null)
                .assetName(holding.getAsset() != null ? holding.getAsset().getName() : null)
                .symbol(holding.getAsset() != null ? holding.getAsset().getSymbol() : null)
                .assetClass(holding.getAsset() != null && holding.getAsset().getAssetClass() != null 
                        ? holding.getAsset().getAssetClass().name() : null)
                .quantity(holding.getQuantity())
                .averageBuyPrice(holding.getAverageBuyPrice())
                .currentPrice(holding.getAsset() != null ? holding.getAsset().getCurrentPrice() : null)
                .currentValue(holdingValue)
                .allocationPercentage(allocationPercent)
                .build();
    }
}
