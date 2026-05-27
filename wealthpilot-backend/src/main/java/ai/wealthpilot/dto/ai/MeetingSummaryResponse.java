package ai.wealthpilot.dto.ai;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MeetingSummaryResponse {
    private UUID summaryId;
    private UUID meetingId;
    private String summaryText;
    private String keyDecisions;
    private String actionItems;
    private String clientSentiment;
}
