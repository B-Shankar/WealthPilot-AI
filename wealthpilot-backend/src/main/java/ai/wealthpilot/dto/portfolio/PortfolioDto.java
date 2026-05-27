package ai.wealthpilot.dto.portfolio;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PortfolioDto {
    private UUID id;
    private String name;
    private String description;
    private BigDecimal totalValue;
    private String currency;
    private UUID clientId;
    private String clientName;
    private List<HoldingDto> holdings;
}
