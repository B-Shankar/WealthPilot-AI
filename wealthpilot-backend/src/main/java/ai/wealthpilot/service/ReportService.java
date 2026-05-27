package ai.wealthpilot.service;

import java.util.UUID;

public interface ReportService {
    byte[] generateClientWealthReport(UUID clientId, String rmEmail);
}
