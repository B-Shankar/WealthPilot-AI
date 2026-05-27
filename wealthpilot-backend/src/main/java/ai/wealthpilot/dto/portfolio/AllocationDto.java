package ai.wealthpilot.dto.portfolio;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AllocationDto {
    private String name; // e.g. Asset Class name or Sector name
    private BigDecimal value; // Total monetary value
    private BigDecimal percentage; // Allocation percentage
}
