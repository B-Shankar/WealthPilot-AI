package ai.wealthpilot.service.impl;

import ai.wealthpilot.dto.client.ClientCreateDto;
import ai.wealthpilot.dto.client.ClientDto;
import ai.wealthpilot.exception.ApiException;
import ai.wealthpilot.exception.ResourceNotFoundException;
import ai.wealthpilot.mapper.ClientMapper;
import ai.wealthpilot.model.entity.Client;
import ai.wealthpilot.model.entity.User;
import ai.wealthpilot.model.enums.RoleName;
import ai.wealthpilot.repository.ClientRepository;
import ai.wealthpilot.repository.UserRepository;
import ai.wealthpilot.service.ClientService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ClientServiceImpl implements ClientService {

    private final ClientRepository clientRepository;
    private final UserRepository userRepository;
    private final ClientMapper clientMapper;

    @Override
    public List<ClientDto> getAllClientsForRm(String rmEmail) {
        User rm = getRmUser(rmEmail);
        List<Client> clients;

        if (isAdmin(rm)) {
            clients = clientRepository.findAll();
        } else {
            clients = clientRepository.findByRelationshipManagerId(rm.getId());
        }

        return clients.stream()
                .map(clientMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<ClientDto> searchClientsForRm(String rmEmail, String nameQuery) {
        User rm = getRmUser(rmEmail);
        List<Client> clients;

        if (isAdmin(rm)) {
            // Find all matching if admin
            clients = clientRepository.findAll().stream()
                    .filter(c -> c.getFullName().toLowerCase().contains(nameQuery.toLowerCase()))
                    .collect(Collectors.toList());
        } else {
            clients = clientRepository.findByRelationshipManagerIdAndFullNameContainingIgnoreCase(rm.getId(), nameQuery);
        }

        return clients.stream()
                .map(clientMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public ClientDto getClientByIdForRm(UUID id, String rmEmail) {
        User rm = getRmUser(rmEmail);
        Client client = clientRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Client", "id", id.toString()));

        validateRmOwnership(rm, client);
        return clientMapper.toDto(client);
    }

    @Override
    @Transactional
    public ClientDto createClientForRm(ClientCreateDto dto, String rmEmail) {
        User rm = getRmUser(rmEmail);
        Client client = clientMapper.toEntity(dto);
        client.setRelationshipManager(rm);

        Client savedClient = clientRepository.save(client);
        return clientMapper.toDto(savedClient);
    }

    @Override
    @Transactional
    public ClientDto updateClientForRm(UUID id, ClientCreateDto dto, String rmEmail) {
        User rm = getRmUser(rmEmail);
        Client client = clientRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Client", "id", id.toString()));

        validateRmOwnership(rm, client);

        client.setFullName(dto.getFullName());
        client.setEmail(dto.getEmail());
        client.setPhone(dto.getPhone());
        client.setDateOfBirth(dto.getDateOfBirth());
        client.setOccupation(dto.getOccupation());
        client.setStatus(dto.getStatus());
        client.setRiskProfile(dto.getRiskProfile());
        client.setTotalNetWorth(dto.getTotalNetWorth());

        Client updatedClient = clientRepository.save(client);
        return clientMapper.toDto(updatedClient);
    }

    @Override
    @Transactional
    public void deleteClientForRm(UUID id, String rmEmail) {
        User rm = getRmUser(rmEmail);
        Client client = clientRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Client", "id", id.toString()));

        validateRmOwnership(rm, client);
        clientRepository.delete(client);
    }

    private User getRmUser(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", email));
    }

    private boolean isAdmin(User user) {
        return user.getRoles().stream()
                .anyMatch(role -> role.getName() == RoleName.ROLE_ADMIN);
    }

    private void validateRmOwnership(User rm, Client client) {
        if (!isAdmin(rm) && !client.getRelationshipManager().getId().equals(rm.getId())) {
            throw new ApiException("Access Denied: You do not manage this client", HttpStatus.FORBIDDEN);
        }
    }
}
