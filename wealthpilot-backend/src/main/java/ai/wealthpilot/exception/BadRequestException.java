package ai.wealthpilot.exception;

import org.springframework.http.HttpStatus;

/**
 * Thrown when a client request contains invalid or malformed data.
 */
public class BadRequestException extends ApiException {

    public BadRequestException(String message) {
        super(message, HttpStatus.BAD_REQUEST);
    }
}
