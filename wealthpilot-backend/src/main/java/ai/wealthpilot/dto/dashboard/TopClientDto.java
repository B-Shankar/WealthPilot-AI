package ai.wealthpilot.dto.dashboard;

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
public class TopClientDto {
    private UUID clientId;
    private String fullName;
    private String email;
    private String riskProfile;
    private BigDecimal netWorth;
    private String status;
}
