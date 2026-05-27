package ai.wealthpilot.exception;

import org.springframework.http.HttpStatus;

/**
 * Thrown when authentication credentials are missing or invalid.
 */
public class UnauthorizedException extends ApiException {

    public UnauthorizedException(String message) {
        super(message, HttpStatus.UNAUTHORIZED);
    }
}
