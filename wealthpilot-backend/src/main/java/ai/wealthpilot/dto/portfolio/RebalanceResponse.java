package ai.wealthpilot.dto.portfolio;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RebalanceResponse {
    private UUID portfolioId;
    private List<AllocationDto> currentAllocations;
    private List<AllocationDto> targetAllocations;
    private List<ProposedTradeDto> proposedTrades;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ProposedTradeDto {
        private String symbol;
        private String assetName;
        private String assetClass;
        private String action; // BUY or SELL
        private BigDecimal tradeAmount;
        private BigDecimal tradeQuantity;
        private BigDecimal currentPrice;
    }
}
