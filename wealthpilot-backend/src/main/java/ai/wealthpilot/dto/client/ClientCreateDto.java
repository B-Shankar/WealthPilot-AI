package ai.wealthpilot.dto.client;

import ai.wealthpilot.model.enums.ClientStatus;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ClientCreateDto {

    @NotBlank(message = "Client full name is required")
    @Size(max = 150, message = "Name must be less than 150 characters")
    private String fullName;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    @Size(max = 150, message = "Email must be less than 150 characters")
    private String email;

    @Size(max = 20, message = "Phone must be less than 20 characters")
    private String phone;

    private LocalDate dateOfBirth;

    @Size(max = 100, message = "Occupation must be less than 100 characters")
    private String occupation;

    @Builder.Default
    private ClientStatus status = ClientStatus.ACTIVE;

    @NotBlank(message = "Risk profile is required")
    private String riskProfile; // e.g. CONSERVATIVE, BALANCED, GROWTH, AGGRESSIVE

    private BigDecimal totalNetWorth;
}
