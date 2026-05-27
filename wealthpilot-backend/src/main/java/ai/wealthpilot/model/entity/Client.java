package ai.wealthpilot.model.entity;

import ai.wealthpilot.model.audit.DateAudit;
import ai.wealthpilot.model.enums.ClientStatus;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/**
 * High-net-worth client managed by a Relationship Manager.
 */
@Entity
@Table(name = "clients", indexes = {
        @Index(name = "idx_clients_rm", columnList = "relationship_manager_id"),
        @Index(name = "idx_clients_status", columnList = "status")
})
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Client extends DateAudit {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false, length = 150)
    private String fullName;

    @Column(nullable = false, unique = true, length = 150)
    private String email;

    @Column(length = 20)
    private String phone;

    private LocalDate dateOfBirth;

    @Column(length = 100)
    private String occupation;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    @Builder.Default
    private ClientStatus status = ClientStatus.ACTIVE;

    @Column(length = 30)
    private String riskProfile;

    @Column(precision = 19, scale = 4)
    private BigDecimal totalNetWorth;

    /** The RM responsible for this client relationship */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "relationship_manager_id")
    private User relationshipManager;

    @Builder.Default
    @OneToMany(mappedBy = "client", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Portfolio> portfolios = new ArrayList<>();
}
