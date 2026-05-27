package ai.wealthpilot.model.entity;

import ai.wealthpilot.model.audit.DateAudit;
import ai.wealthpilot.model.enums.AssetClass;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.UUID;

/**
 * A tradable financial instrument (stock, bond, ETF, commodity, etc.).
 */
@Entity
@Table(name = "assets", indexes = {
        @Index(name = "idx_assets_symbol", columnList = "symbol")
})
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Asset extends DateAudit {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false, length = 200)
    private String name;

    @Column(nullable = false, length = 20, unique = true)
    private String symbol;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private AssetClass assetClass;

    @Column(length = 100)
    private String exchange;

    @Column(length = 10)
    private String currency;

    @Column(precision = 19, scale = 4)
    private BigDecimal currentPrice;
}
