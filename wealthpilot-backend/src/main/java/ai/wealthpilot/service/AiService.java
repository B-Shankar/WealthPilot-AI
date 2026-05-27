package ai.wealthpilot.service;

import ai.wealthpilot.dto.ai.*;

import java.util.List;
import java.util.UUID;

public interface AiService {
    ChatResponse chat(ChatRequest request, String rmEmail);
    MeetingSummaryResponse generateMeetingSummary(UUID meetingId, String rmEmail);
    List<RecommendationDto> getAiRecommendationsForClient(UUID clientId, String rmEmail);
    RecommendationDto approveRecommendation(UUID insightId, String rmEmail);
}
