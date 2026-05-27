package ai.wealthpilot.service.impl;

import ai.wealthpilot.dto.auth.LoginRequest;
import ai.wealthpilot.dto.auth.RegisterRequest;
import ai.wealthpilot.dto.auth.TokenResponse;
import ai.wealthpilot.dto.auth.UserResponseDto;
import ai.wealthpilot.exception.BadRequestException;
import ai.wealthpilot.exception.ResourceNotFoundException;
import ai.wealthpilot.model.entity.Role;
import ai.wealthpilot.model.entity.User;
import ai.wealthpilot.model.enums.RoleName;
import ai.wealthpilot.repository.RoleRepository;
import ai.wealthpilot.repository.UserRepository;
import ai.wealthpilot.security.JwtTokenProvider;
import ai.wealthpilot.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider tokenProvider;

    @Override
    public TokenResponse login(LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getEmail(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = tokenProvider.generateAccessToken(authentication);

        User user = userRepository.findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", loginRequest.getEmail()));

        return TokenResponse.builder()
                .accessToken(jwt)
                .user(mapToUserResponseDto(user))
                .build();
    }

    @Override
    @Transactional
    public UserResponseDto register(RegisterRequest registerRequest) {
        if (userRepository.existsByEmail(registerRequest.getEmail())) {
            throw new BadRequestException("Email address already in use!");
        }

        RoleName requestedRoleName = RoleName.ROLE_RELATIONSHIP_MANAGER;
        if (registerRequest.getRole() != null) {
            try {
                requestedRoleName = RoleName.valueOf("ROLE_" + registerRequest.getRole().toUpperCase());
            } catch (IllegalArgumentException e) {
                throw new BadRequestException("Invalid role specified. Supported: ADMIN, RELATIONSHIP_MANAGER, ANALYST");
            }
        }

        RoleName finalRequestedRoleName = requestedRoleName;
        Role userRole = roleRepository.findByName(requestedRoleName)
                .orElseThrow(() -> new ResourceNotFoundException("Role", "name", finalRequestedRoleName.name()));

        Set<Role> roles = new HashSet<>();
        roles.add(userRole);

        User user = User.builder()
                .fullName(registerRequest.getFullName())
                .email(registerRequest.getEmail())
                .password(passwordEncoder.encode(registerRequest.getPassword()))
                .phone(registerRequest.getPhone())
                .active(true)
                .roles(roles)
                .build();

        User result = userRepository.save(user);
        return mapToUserResponseDto(result);
    }

    @Override
    public UserResponseDto getCurrentUser(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", email));
        return mapToUserResponseDto(user);
    }

    private UserResponseDto mapToUserResponseDto(User user) {
        Set<String> roles = user.getRoles().stream()
                .map(role -> role.getName().name())
                .collect(Collectors.toSet());

        return UserResponseDto.builder()
                .id(user.getId())
                .fullName(user.getFullName())
                .email(user.getEmail())
                .phone(user.getPhone())
                .roles(roles)
                .build();
    }
}
