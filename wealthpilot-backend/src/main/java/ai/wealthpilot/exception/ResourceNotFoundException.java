package ai.wealthpilot.exception;

import org.springframework.http.HttpStatus;

/**
 * Thrown when a requested resource (entity) cannot be found in the database.
 */
public class ResourceNotFoundException extends ApiException {

    public ResourceNotFoundException(String resourceName, String fieldName, Object fieldValue) {
        super(String.format("%s not found with %s: '%s'", resourceName, fieldName, fieldValue), HttpStatus.NOT_FOUND);
    }
}
