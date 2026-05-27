package ai.wealthpilot.service;

import ai.wealthpilot.dto.portfolio.*;

import java.util.List;
import java.util.UUID;

public interface PortfolioService {
    PortfolioDto getPortfolioById(UUID id, String rmEmail);
    List<PortfolioDto> getPortfoliosByClientId(UUID clientId, String rmEmail);
    List<AllocationDto> getPortfolioAllocation(UUID id, String rmEmail);
    RiskAnalyticsDto getPortfolioRiskAnalytics(UUID id, String rmEmail);
    RebalanceResponse simulateRebalance(UUID id, RebalanceRequest request, String rmEmail);
}
