package ai.wealthpilot.dto.auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TokenResponse {
    private String accessToken;
    @Builder.Default
    private String tokenType = "Bearer";
    private UserResponseDto user;
}
