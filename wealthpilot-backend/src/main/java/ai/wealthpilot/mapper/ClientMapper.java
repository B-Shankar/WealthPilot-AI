package ai.wealthpilot.mapper;

import ai.wealthpilot.dto.client.ClientCreateDto;
import ai.wealthpilot.dto.client.ClientDto;
import ai.wealthpilot.model.entity.Client;
import org.springframework.stereotype.Component;

@Component
public class ClientMapper {

    public ClientDto toDto(Client client) {
        if (client == null) {
            return null;
        }

        return ClientDto.builder()
                .id(client.getId())
                .fullName(client.getFullName())
                .email(client.getEmail())
                .phone(client.getPhone())
                .dateOfBirth(client.getDateOfBirth())
                .occupation(client.getOccupation())
                .status(client.getStatus())
                .riskProfile(client.getRiskProfile())
                .totalNetWorth(client.getTotalNetWorth())
                .relationshipManagerId(client.getRelationshipManager() != null ? client.getRelationshipManager().getId() : null)
                .relationshipManagerName(client.getRelationshipManager() != null ? client.getRelationshipManager().getFullName() : null)
                .build();
    }

    public Client toEntity(ClientCreateDto dto) {
        if (dto == null) {
            return null;
        }

        return Client.builder()
                .fullName(dto.getFullName())
                .email(dto.getEmail())
                .phone(dto.getPhone())
                .dateOfBirth(dto.getDateOfBirth())
                .occupation(dto.getOccupation())
                .status(dto.getStatus())
                .riskProfile(dto.getRiskProfile())
                .totalNetWorth(dto.getTotalNetWorth())
                .build();
    }
}
