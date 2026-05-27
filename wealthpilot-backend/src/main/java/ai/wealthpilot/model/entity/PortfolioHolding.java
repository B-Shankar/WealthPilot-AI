package ai.wealthpilot.model.entity;

import ai.wealthpilot.model.audit.DateAudit;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.UUID;

/**
 * Bridge table linking a Portfolio to an Asset with quantity and market value.
 */
@Entity
@Table(name = "portfolio_holdings", indexes = {
        @Index(name = "idx_holdings_portfolio", columnList = "portfolio_id"),
        @Index(name = "idx_holdings_asset", columnList = "asset_id")
})
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PortfolioHolding extends DateAudit {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "portfolio_id", nullable = false)
    private Portfolio portfolio;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "asset_id", nullable = false)
    private Asset asset;

    @Column(nullable = false, precision = 19, scale = 6)
    private BigDecimal quantity;

    @Column(precision = 19, scale = 4)
    private BigDecimal averageBuyPrice;

    @Column(precision = 19, scale = 4)
    private BigDecimal currentValue;
}
