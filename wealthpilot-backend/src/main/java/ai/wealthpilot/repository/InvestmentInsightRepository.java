package ai.wealthpilot.repository;

import ai.wealthpilot.model.entity.InvestmentInsight;
import ai.wealthpilot.model.enums.InsightType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface InvestmentInsightRepository extends JpaRepository<InvestmentInsight, UUID> {
    List<InvestmentInsight> findByClientId(UUID clientId);
    List<InvestmentInsight> findByClientRelationshipManagerId(UUID rmId);
    List<InvestmentInsight> findByClientIdAndAcknowledgedFalse(UUID clientId);
}
