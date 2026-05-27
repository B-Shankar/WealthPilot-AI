package ai.wealthpilot.dto.portfolio;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RebalanceRequest {
    private Map<String, BigDecimal> targetAllocations; // e.g. {"EQUITY": 0.60, "FIXED_INCOME": 0.30}
}
