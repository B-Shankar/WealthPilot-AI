package ai.wealthpilot.controller;

import ai.wealthpilot.service.ReportService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/reports")
@RequiredArgsConstructor
@Tag(name = "Report Generation APIs", description = "Endpoints for generating vector-styled client wealth statements in PDF format")
public class ReportController {

    private final ReportService reportService;

    @GetMapping("/client/{clientId}/pdf")
    @Operation(summary = "Downloads a highly-styled PDF wealth statement containing current asset classes, values, and allocations")
    public ResponseEntity<byte[]> downloadWealthReport(@PathVariable UUID clientId, Principal principal) {
        byte[] pdfBytes = reportService.generateClientWealthReport(clientId, principal.getName());

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDispositionFormData("attachment", "executive-wealth-statement-" + clientId + ".pdf");
        headers.setCacheControl("must-revalidate, post-check=0, pre-check=0");

        return ResponseEntity.ok()
                .headers(headers)
                .body(pdfBytes);
    }
}
