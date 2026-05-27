package ai.wealthpilot.repository;

import ai.wealthpilot.model.entity.Asset;
import ai.wealthpilot.model.enums.AssetClass;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface AssetRepository extends JpaRepository<Asset, UUID> {
    Optional<Asset> findBySymbol(String symbol);
    List<Asset> findByAssetClass(AssetClass assetClass);
}
