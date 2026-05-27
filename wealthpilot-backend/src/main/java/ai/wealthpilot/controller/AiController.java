package ai.wealthpilot.controller;

import ai.wealthpilot.dto.ai.*;
import ai.wealthpilot.exception.ApiResponse;
import ai.wealthpilot.service.AiService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/ai")
@RequiredArgsConstructor
@Tag(name = "AI Copilot & Summaries APIs", description = "Endpoints for conversational portfolio copilot, audio meeting transcript summaries, and tactical investment recommendations")
public class AiController {

    private final AiService aiService;

    @PostMapping("/copilot/chat")
    @Operation(summary = "Submits a prompt to the AI Copilot for portfolio queries")
    public ResponseEntity<ApiResponse<ChatResponse>> copilotChat(
            @Valid @RequestBody ChatRequest request, Principal principal) {
        ChatResponse chatResponse = aiService.chat(request, principal.getName());
        return ResponseEntity.ok(ApiResponse.success(chatResponse, "AI response generated successfully"));
    }

    @PostMapping("/meetings/{meetingId}/summarize")
    @Operation(summary = "Generates and logs an executive summary, decisions, and tasks from a meeting")
    public ResponseEntity<ApiResponse<MeetingSummaryResponse>> summarizeMeeting(
            @PathVariable UUID meetingId, Principal principal) {
        MeetingSummaryResponse response = aiService.generateMeetingSummary(meetingId, principal.getName());
        return ResponseEntity.ok(ApiResponse.success(response, "Meeting summary generated and stored successfully"));
    }

    @GetMapping("/recommendations/client/{clientId}")
    @Operation(summary = "Fetches AI-native tactical investment recommendations for an HNW client portfolio")
    public ResponseEntity<ApiResponse<List<RecommendationDto>>> getRecommendations(
            @PathVariable UUID clientId, Principal principal) {
        List<RecommendationDto> recommendations = aiService.getAiRecommendationsForClient(clientId, principal.getName());
        return ResponseEntity.ok(ApiResponse.success(recommendations, "AI investment recommendations retrieved"));
    }

    @PostMapping("/recommendations/{insightId}/acknowledge")
    @Operation(summary = "Acknowledges and approves an AI-proposed investment insight or rebalance draft")
    public ResponseEntity<ApiResponse<RecommendationDto>> approveRecommendation(
            @PathVariable UUID insightId, Principal principal) {
        RecommendationDto response = aiService.approveRecommendation(insightId, principal.getName());
        return ResponseEntity.ok(ApiResponse.success(response, "AI investment recommendation acknowledged successfully"));
    }
}
