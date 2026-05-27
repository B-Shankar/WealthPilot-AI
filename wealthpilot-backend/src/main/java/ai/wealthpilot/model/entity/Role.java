package ai.wealthpilot.model.entity;

import ai.wealthpilot.model.enums.RoleName;
import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

/**
 * Represents an authorization role (e.g. ROLE_ADMIN).
 */
@Entity
@Table(name = "roles")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, unique = true, length = 40)
    private RoleName name;
}
