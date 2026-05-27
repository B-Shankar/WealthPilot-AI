package ai.wealthpilot.service;

import ai.wealthpilot.dto.auth.LoginRequest;
import ai.wealthpilot.dto.auth.RegisterRequest;
import ai.wealthpilot.dto.auth.TokenResponse;
import ai.wealthpilot.dto.auth.UserResponseDto;

public interface AuthService {
    TokenResponse login(LoginRequest loginRequest);
    UserResponseDto register(RegisterRequest registerRequest);
    UserResponseDto getCurrentUser(String email);
}
