package ai.wealthpilot.service;

import ai.wealthpilot.dto.client.ClientCreateDto;
import ai.wealthpilot.dto.client.ClientDto;

import java.util.List;
import java.util.UUID;

public interface ClientService {
    List<ClientDto> getAllClientsForRm(String rmEmail);
    List<ClientDto> searchClientsForRm(String rmEmail, String nameQuery);
    ClientDto getClientByIdForRm(UUID id, String rmEmail);
    ClientDto createClientForRm(ClientCreateDto dto, String rmEmail);
    ClientDto updateClientForRm(UUID id, ClientCreateDto dto, String rmEmail);
    void deleteClientForRm(UUID id, String rmEmail);
}
