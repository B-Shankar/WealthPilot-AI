package ai.wealthpilot.dto.ai;

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
public class RecommendationDto {
    private UUID id;
    private UUID clientId;
    private String clientName;
    private String title;
    private String content;
    private String insightType; // DRIFT_CORRECTION, TAX_LOSS_HARVESTING, etc.
    private String severity; // HIGH, MEDIUM, LOW
    private boolean acknowledged;
    private LocalDateTime createdAt;
}
