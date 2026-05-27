package ai.wealthpilot.controller;

import ai.wealthpilot.dto.portfolio.*;
import ai.wealthpilot.exception.ApiResponse;
import ai.wealthpilot.service.PortfolioService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/portfolios")
@RequiredArgsConstructor
@Tag(name = "Portfolio & Analytics APIs", description = "Endpoints for managing portfolios, historical valuations, risk metrics, and rebalancing simulations")
public class PortfolioController {

    private final PortfolioService portfolioService;

    @GetMapping("/{id}")
    @Operation(summary = "Retrieves an investment portfolio along with holdings details")
    public ResponseEntity<ApiResponse<PortfolioDto>> getPortfolioById(@PathVariable UUID id, Principal principal) {
        PortfolioDto portfolio = portfolioService.getPortfolioById(id, principal.getName());
        return ResponseEntity.ok(ApiResponse.success(portfolio, "Portfolio details fetched"));
    }

    @GetMapping("/client/{clientId}")
    @Operation(summary = "Retrieves all investment portfolios belonging to a client")
    public ResponseEntity<ApiResponse<List<PortfolioDto>>> getPortfoliosByClientId(@PathVariable UUID clientId, Principal principal) {
        List<PortfolioDto> portfolios = portfolioService.getPortfoliosByClientId(clientId, principal.getName());
        return ResponseEntity.ok(ApiResponse.success(portfolios, "Client portfolios fetched"));
    }

    @GetMapping("/{id}/allocation")
    @Operation(summary = "Retrieves the asset class allocation weights of a portfolio")
    public ResponseEntity<ApiResponse<List<AllocationDto>>> getPortfolioAllocation(@PathVariable UUID id, Principal principal) {
        List<AllocationDto> allocations = portfolioService.getPortfolioAllocation(id, principal.getName());
        return ResponseEntity.ok(ApiResponse.success(allocations, "Portfolio allocations fetched"));
    }

    @GetMapping("/{id}/risk")
    @Operation(summary = "Calculates advanced volatility and risk stats (Beta, standard deviation, VaR, Sharpe)")
    public ResponseEntity<ApiResponse<RiskAnalyticsDto>> getPortfolioRiskAnalytics(@PathVariable UUID id, Principal principal) {
        RiskAnalyticsDto riskAnalytics = portfolioService.getPortfolioRiskAnalytics(id, principal.getName());
        return ResponseEntity.ok(ApiResponse.success(riskAnalytics, "Portfolio risk metrics calculated"));
    }

    @PostMapping("/{id}/rebalance")
    @Operation(summary = "Simulates tactical trade orders needed to realign a portfolio to target weights")
    public ResponseEntity<ApiResponse<RebalanceResponse>> simulateRebalance(
            @PathVariable UUID id, @RequestBody RebalanceRequest request, Principal principal) {
        RebalanceResponse rebalanceResponse = portfolioService.simulateRebalance(id, request, principal.getName());
        return ResponseEntity.ok(ApiResponse.success(rebalanceResponse, "Portfolio rebalancing simulation completed"));
    }
}
