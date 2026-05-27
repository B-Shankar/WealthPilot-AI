package ai.wealthpilot.repository;

import ai.wealthpilot.model.entity.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ClientRepository extends JpaRepository<Client, UUID> {
    List<Client> findByRelationshipManagerId(UUID rmId);
    List<Client> findByRelationshipManagerIdAndFullNameContainingIgnoreCase(UUID rmId, String fullName);
}
