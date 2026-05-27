package ai.wealthpilot.dto.client;

import ai.wealthpilot.model.enums.ClientStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ClientDto {
    private UUID id;
    private String fullName;
    private String email;
    private String phone;
    private LocalDate dateOfBirth;
    private String occupation;
    private ClientStatus status;
    private String riskProfile;
    private BigDecimal totalNetWorth;
    private UUID relationshipManagerId;
    private String relationshipManagerName;
}
