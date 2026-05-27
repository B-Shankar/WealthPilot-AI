package ai.wealthpilot.model.entity;

import ai.wealthpilot.model.audit.DateAudit;
import ai.wealthpilot.model.enums.InsightType;
import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

/**
 * AI-generated tactical investment insight or recommendation for a client.
 */
@Entity
@Table(name = "investment_insights", indexes = {
        @Index(name = "idx_insights_client", columnList = "client_id"),
        @Index(name = "idx_insights_type", columnList = "insight_type")
})
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class InvestmentInsight extends DateAudit {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false, length = 250)
    private String title;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String content;

    @Enumerated(EnumType.STRING)
    @Column(name = "insight_type", nullable = false, length = 30)
    private InsightType insightType;

    @Column(length = 20)
    private String severity;

    @Builder.Default
    @Column(nullable = false)
    private boolean acknowledged = false;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "client_id")
    private Client client;
}
