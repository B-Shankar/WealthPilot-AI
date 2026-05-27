package ai.wealthpilot.controller;

import ai.wealthpilot.dto.auth.LoginRequest;
import ai.wealthpilot.dto.auth.RegisterRequest;
import ai.wealthpilot.dto.auth.TokenResponse;
import ai.wealthpilot.dto.auth.UserResponseDto;
import ai.wealthpilot.exception.ApiResponse;
import ai.wealthpilot.service.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@Tag(name = "Authentication APIs", description = "Endpoints for user registration, JWT login, and session validation")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    @Operation(summary = "Authenticates user and issues JWT Token")
    public ResponseEntity<ApiResponse<TokenResponse>> login(@Valid @RequestBody LoginRequest request) {
        TokenResponse tokenResponse = authService.login(request);
        return ResponseEntity.ok(ApiResponse.success(tokenResponse, "User authenticated successfully"));
    }

    @PostMapping("/register")
    @Operation(summary = "Registers a new user (Relationship Manager, Advisor, Analyst)")
    public ResponseEntity<ApiResponse<UserResponseDto>> register(@Valid @RequestBody RegisterRequest request) {
        UserResponseDto responseDto = authService.register(request);
        return ResponseEntity.ok(ApiResponse.success(responseDto, "User registered successfully"));
    }

    @GetMapping("/me")
    @Operation(summary = "Retrieves current logged-in user profile details")
    public ResponseEntity<ApiResponse<UserResponseDto>> getMe(Principal principal) {
        if (principal == null) {
            return ResponseEntity.status(401).body(ApiResponse.error("Unauthorized: No session detected"));
        }
        UserResponseDto currentUser = authService.getCurrentUser(principal.getName());
        return ResponseEntity.ok(ApiResponse.success(currentUser, "Current user profile fetched"));
    }
}
