package ai.wealthpilot.service;

import ai.wealthpilot.dto.dashboard.DashboardMetricsDto;

public interface DashboardService {
    DashboardMetricsDto getDashboardMetrics(String rmEmail);
}
