package ai.wealthpilot.dto.dashboard;

import ai.wealthpilot.dto.portfolio.AllocationDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DashboardMetricsDto {
    private BigDecimal totalAum;
    private Long totalClients;
    private BigDecimal averageClientAum;
    private Long activeAlertsCount;
    private Long portfolioDriftCount;
    private Long monthlyMeetingCount;
    private List<AllocationDto> assetAllocation;
    private List<TopClientDto> topClients;
}
