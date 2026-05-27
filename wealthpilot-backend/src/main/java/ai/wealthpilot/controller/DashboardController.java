package ai.wealthpilot.controller;

import ai.wealthpilot.dto.dashboard.DashboardMetricsDto;
import ai.wealthpilot.exception.ApiResponse;
import ai.wealthpilot.service.DashboardService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/api/v1/dashboard")
@RequiredArgsConstructor
@Tag(name = "Dashboard Analytics APIs", description = "Endpoints for Relationship Manager business intelligence cockpit KPIs")
public class DashboardController {

    private final DashboardService dashboardService;

    @GetMapping("/metrics")
    @Operation(summary = "Retrieves aggregated business KPIs (Managed AUM, clients, drift alerts, sector allocations)")
    public ResponseEntity<ApiResponse<DashboardMetricsDto>> getDashboardMetrics(Principal principal) {
        DashboardMetricsDto metrics = dashboardService.getDashboardMetrics(principal.getName());
        return ResponseEntity.ok(ApiResponse.success(metrics, "Dashboard analytics fetched"));
    }
}
