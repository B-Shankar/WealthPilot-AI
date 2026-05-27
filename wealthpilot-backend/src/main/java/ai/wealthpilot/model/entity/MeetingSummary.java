package ai.wealthpilot.model.entity;

import ai.wealthpilot.model.audit.DateAudit;
import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

/**
 * AI-generated summary of a Meeting, containing key discussion points,
 * decisions, action items, and client sentiment analysis.
 */
@Entity
@Table(name = "meeting_summaries")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MeetingSummary extends DateAudit {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(columnDefinition = "TEXT")
    private String summaryText;

    @Column(columnDefinition = "TEXT")
    private String keyDecisions;

    @Column(columnDefinition = "TEXT")
    private String actionItems;

    @Column(length = 50)
    private String clientSentiment;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "meeting_id", nullable = false, unique = true)
    private Meeting meeting;
}
