package ai.wealthpilot.service.impl;

import ai.wealthpilot.exception.ApiException;
import ai.wealthpilot.exception.ResourceNotFoundException;
import ai.wealthpilot.model.entity.*;
import com.lowagie.text.*;
import com.lowagie.text.Font;
import com.lowagie.text.pdf.*;
import ai.wealthpilot.model.enums.RoleName;
import ai.wealthpilot.repository.ClientRepository;
import ai.wealthpilot.repository.PortfolioRepository;
import ai.wealthpilot.repository.UserRepository;
import ai.wealthpilot.service.ReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.awt.Color;
import java.io.ByteArrayOutputStream;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ReportServiceImpl implements ReportService {

    private final ClientRepository clientRepository;
    private final PortfolioRepository portfolioRepository;
    private final UserRepository userRepository;

    @Override
    public byte[] generateClientWealthReport(UUID clientId, String rmEmail) {
        User rm = userRepository.findByEmail(rmEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", rmEmail));

        Client client = clientRepository.findById(clientId)
                .orElseThrow(() -> new ResourceNotFoundException("Client", "id", clientId.toString()));

        validateRmOwnership(rm, client);

        List<Portfolio> portfolios = portfolioRepository.findByClientId(clientId);
        BigDecimal totalWealth = portfolios.stream()
                .map(p -> p.getTotalValue() != null ? p.getTotalValue() : BigDecimal.ZERO)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        Document document = new Document(PageSize.A4, 36, 36, 54, 36);
        ByteArrayOutputStream out = new ByteArrayOutputStream();

        try {
            PdfWriter.getInstance(document, out);
            document.open();

            // 1. Title Page Banner Header
            Font titleFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 24, new Color(13, 27, 42));
            Paragraph header = new Paragraph("WEALTHPILOT AI", titleFont);
            header.setAlignment(Element.ALIGN_CENTER);
            header.setSpacingAfter(5);
            document.add(header);

            Font subtitleFont = FontFactory.getFont(FontFactory.HELVETICA, 12, new Color(119, 141, 169));
            Paragraph subtitle = new Paragraph("Private Banking & Asset Management Cockpit", subtitleFont);
            subtitle.setAlignment(Element.ALIGN_CENTER);
            subtitle.setSpacingAfter(25);
            document.add(subtitle);

            // Colored divider
            Paragraph divider = new Paragraph("______________________________________________________________________________", 
                    FontFactory.getFont(FontFactory.HELVETICA, 10, new Color(224, 225, 221)));
            divider.setSpacingAfter(20);
            document.add(divider);

            // 2. Client Profile Info Section
            Font secHeaderFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 14, new Color(27, 38, 59));
            Paragraph secTitle = new Paragraph("Executive Wealth Statement", secHeaderFont);
            secTitle.setSpacingAfter(10);
            document.add(secTitle);

            Font bodyFont = FontFactory.getFont(FontFactory.HELVETICA, 10, Color.BLACK);
            Font boldBodyFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 10, Color.BLACK);

            PdfPTable clientTable = new PdfPTable(2);
            clientTable.setWidthPercentage(100);
            clientTable.setSpacingAfter(20);

            addTableCell(clientTable, "Client Name:", boldBodyFont);
            addTableCell(clientTable, client.getFullName(), bodyFont);
            addTableCell(clientTable, "Risk Profile Mandate:", boldBodyFont);
            addTableCell(clientTable, client.getRiskProfile(), bodyFont);
            addTableCell(clientTable, "Total Managed Wealth:", boldBodyFont);
            addTableCell(clientTable, "$" + formatNumber(totalWealth), bodyFont);
            addTableCell(clientTable, "Relationship Manager:", boldBodyFont);
            addTableCell(clientTable, client.getRelationshipManager() != null ? client.getRelationshipManager().getFullName() : "N/A", bodyFont);
            addTableCell(clientTable, "Statement Date:", boldBodyFont);
            addTableCell(clientTable, LocalDate.now().format(DateTimeFormatter.ofPattern("MMMM dd, yyyy")), bodyFont);

            document.add(clientTable);

            // 3. Portfolios Summaries & Asset Holdings
            Paragraph pHeader = new Paragraph("Asset Holdings & Allocation Breakdown", secHeaderFont);
            pHeader.setSpacingAfter(15);
            document.add(pHeader);

            if (portfolios.isEmpty()) {
                Paragraph emptyPort = new Paragraph("No active portfolios detected for this client.", bodyFont);
                emptyPort.setSpacingAfter(20);
                document.add(emptyPort);
            } else {
                for (Portfolio portfolio : portfolios) {
                    Paragraph pName = new Paragraph("Portfolio: " + portfolio.getName(), 
                            FontFactory.getFont(FontFactory.HELVETICA_BOLD, 12, new Color(65, 90, 119)));
                    pName.setSpacingAfter(5);
                    document.add(pName);

                    Paragraph pDesc = new Paragraph(portfolio.getDescription() != null ? portfolio.getDescription() : "Standard allocation portfolio", 
                            FontFactory.getFont(FontFactory.HELVETICA, 9, Font.ITALIC, Color.GRAY));
                    pDesc.setSpacingAfter(10);
                    document.add(pDesc);

                    PdfPTable holdingsTable = new PdfPTable(6);
                    holdingsTable.setWidthPercentage(100);
                    holdingsTable.setSpacingAfter(25);
                    
                    // Column widths
                    holdingsTable.setWidths(new float[]{1.5f, 3.0f, 2.0f, 1.5f, 2.0f, 1.5f});

                    addTableHeaderCell(holdingsTable, "Ticker", boldBodyFont);
                    addTableHeaderCell(holdingsTable, "Security Name", boldBodyFont);
                    addTableHeaderCell(holdingsTable, "Asset Class", boldBodyFont);
                    addTableHeaderCell(holdingsTable, "Quantity", boldBodyFont);
                    addTableHeaderCell(holdingsTable, "Current Value", boldBodyFont);
                    addTableHeaderCell(holdingsTable, "Weight %", boldBodyFont);

                    BigDecimal pVal = portfolio.getTotalValue() != null ? portfolio.getTotalValue() : BigDecimal.ZERO;

                    for (PortfolioHolding h : portfolio.getHoldings()) {
                        BigDecimal holdingVal = h.getCurrentValue() != null ? h.getCurrentValue() : BigDecimal.ZERO;
                        BigDecimal weight = BigDecimal.ZERO;
                        if (pVal.compareTo(BigDecimal.ZERO) > 0) {
                            weight = holdingVal.multiply(new BigDecimal("100")).divide(pVal, 2, RoundingMode.HALF_UP);
                        }

                        addTableCell(holdingsTable, h.getAsset() != null ? h.getAsset().getSymbol() : "N/A", bodyFont);
                        addTableCell(holdingsTable, h.getAsset() != null ? h.getAsset().getName() : "N/A", bodyFont);
                        addTableCell(holdingsTable, h.getAsset() != null ? h.getAsset().getAssetClass().name() : "N/A", bodyFont);
                        addTableCell(holdingsTable, h.getQuantity().setScale(2, RoundingMode.HALF_UP).toString(), bodyFont);
                        addTableCell(holdingsTable, "$" + formatNumber(holdingVal), bodyFont);
                        addTableCell(holdingsTable, weight + "%", bodyFont);
                    }

                    document.add(holdingsTable);
                }
            }

            // 4. Regulatory disclosures & footer
            Paragraph fDivider = new Paragraph("______________________________________________________________________________", 
                    FontFactory.getFont(FontFactory.HELVETICA, 10, new Color(224, 225, 221)));
            fDivider.setSpacingAfter(15);
            document.add(fDivider);

            Font discFont = FontFactory.getFont(FontFactory.HELVETICA, 8, Font.ITALIC, Color.GRAY);
            Paragraph disclosure = new Paragraph("Confidential Statement: This document is prepared by WealthPilot AI for informational and strategic planning purposes only. Holdings valuations are estimates based on standard daily market closings and may contain delays. Past performance does not guarantee future results.", discFont);
            disclosure.setAlignment(Element.ALIGN_CENTER);
            document.add(disclosure);

            document.close();

        } catch (DocumentException e) {
            throw new ApiException("Failed to generate PDF statement: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return out.toByteArray();
    }

    private void addTableCell(PdfPTable table, String text, Font font) {
        PdfPCell cell = new PdfPCell(new Phrase(text, font));
        cell.setPadding(6);
        cell.setBorderColor(new Color(224, 225, 221));
        table.addCell(cell);
    }

    private void addTableHeaderCell(PdfPTable table, String text, Font font) {
        PdfPCell cell = new PdfPCell(new Phrase(text, font));
        cell.setBackgroundColor(new Color(224, 225, 221));
        cell.setPadding(6);
        cell.setBorderColor(new Color(119, 141, 169));
        table.addCell(cell);
    }

    private void validateRmOwnership(User rm, Client client) {
        boolean isAdmin = rm.getRoles().stream().anyMatch(role -> role.getName() == RoleName.ROLE_ADMIN);
        if (!isAdmin && !client.getRelationshipManager().getId().equals(rm.getId())) {
            throw new ApiException("Access Denied: You do not manage this client", HttpStatus.FORBIDDEN);
        }
    }

    private String formatNumber(BigDecimal val) {
        if (val == null) return "0.00";
        return val.setScale(2, RoundingMode.HALF_UP).toString();
    }
}
