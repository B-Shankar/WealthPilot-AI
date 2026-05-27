package ai.wealthpilot.dto.notification;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class NotificationDto {
    private UUID id;
    private String title;
    private String message;
    private String type; // e.g. PORTFOLIO_ALERT, AI_RECOMMENDATION, etc.
    private boolean read;
    private LocalDateTime createdAt;
}
