package ai.wealthpilot.dto.portfolio;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RiskAnalyticsDto {
    private UUID portfolioId;
    private BigDecimal beta;
    private BigDecimal sharpeRatio;
    private BigDecimal standardDeviation;
    private BigDecimal valueAtRisk95; // Value-at-Risk at 95% confidence
    private BigDecimal maxDrawdown;
    private BigDecimal historicalReturnYearly;
}
