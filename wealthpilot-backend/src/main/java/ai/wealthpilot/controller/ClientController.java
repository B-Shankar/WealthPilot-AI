package ai.wealthpilot.controller;

import ai.wealthpilot.dto.client.ClientCreateDto;
import ai.wealthpilot.dto.client.ClientDto;
import ai.wealthpilot.exception.ApiResponse;
import ai.wealthpilot.service.ClientService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/clients")
@RequiredArgsConstructor
@Tag(name = "Client Management APIs", description = "Endpoints for RM HNW client directory, profiles, and onboarding status updates")
public class ClientController {

    private final ClientService clientService;

    @GetMapping
    @Operation(summary = "Fetches all HNW clients managed by the active RM")
    public ResponseEntity<ApiResponse<List<ClientDto>>> getAllClients(Principal principal) {
        List<ClientDto> clients = clientService.getAllClientsForRm(principal.getName());
        return ResponseEntity.ok(ApiResponse.success(clients, "Managed clients list retrieved"));
    }

    @GetMapping("/search")
    @Operation(summary = "Searches clients under the RM's portfolio by name")
    public ResponseEntity<ApiResponse<List<ClientDto>>> searchClients(@RequestParam String query, Principal principal) {
        List<ClientDto> clients = clientService.searchClientsForRm(principal.getName(), query);
        return ResponseEntity.ok(ApiResponse.success(clients, "Filtered clients list retrieved"));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Retrieves profile details for a specific HNW client")
    public ResponseEntity<ApiResponse<ClientDto>> getClientById(@PathVariable UUID id, Principal principal) {
        ClientDto client = clientService.getClientByIdForRm(id, principal.getName());
        return ResponseEntity.ok(ApiResponse.success(client, "Client profile retrieved"));
    }

    @PostMapping
    @Operation(summary = "Onboards a new HNW client under the active RM")
    public ResponseEntity<ApiResponse<ClientDto>> createClient(@Valid @RequestBody ClientCreateDto dto, Principal principal) {
        ClientDto client = clientService.createClientForRm(dto, principal.getName());
        return ResponseEntity.ok(ApiResponse.success(client, "Client profile created successfully"));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Updates profile details and risk parameters for an HNW client")
    public ResponseEntity<ApiResponse<ClientDto>> updateClient(@PathVariable UUID id, @Valid @RequestBody ClientCreateDto dto, Principal principal) {
        ClientDto client = clientService.updateClientForRm(id, dto, principal.getName());
        return ResponseEntity.ok(ApiResponse.success(client, "Client profile updated successfully"));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Deletes an HNW client profile from the cockpit")
    public ResponseEntity<ApiResponse<Void>> deleteClient(@PathVariable UUID id, Principal principal) {
        clientService.deleteClientForRm(id, principal.getName());
        return ResponseEntity.ok(ApiResponse.<Void>success(null, "Client profile deleted successfully"));
    }
}
