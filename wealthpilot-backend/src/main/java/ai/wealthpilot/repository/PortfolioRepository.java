package ai.wealthpilot.repository;

import ai.wealthpilot.model.entity.Portfolio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface PortfolioRepository extends JpaRepository<Portfolio, UUID> {
    List<Portfolio> findByClientId(UUID clientId);
    List<Portfolio> findByClientRelationshipManagerId(UUID rmId);

    @Query("SELECT p FROM Portfolio p JOIN FETCH p.holdings h JOIN FETCH h.asset WHERE p.id = :id")
    Portfolio findByIdWithHoldingsAndAsset(UUID id);
}
