package ai.wealthpilot.controller;

import ai.wealthpilot.dto.notification.NotificationDto;
import ai.wealthpilot.exception.ApiResponse;
import ai.wealthpilot.service.NotificationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/notifications")
@RequiredArgsConstructor
@Tag(name = "Notification Alerts APIs", description = "Endpoints for advisor push alerts, meeting reminders, and system portfolio updates")
public class NotificationController {

    private final NotificationService notificationService;

    @GetMapping
    @Operation(summary = "Retrieves all notifications for the active user sorted by date")
    public ResponseEntity<ApiResponse<List<NotificationDto>>> getNotifications(Principal principal) {
        List<NotificationDto> notifications = notificationService.getNotificationsForUser(principal.getName());
        return ResponseEntity.ok(ApiResponse.success(notifications, "Notifications list retrieved"));
    }

    @GetMapping("/unread")
    @Operation(summary = "Retrieves unread notifications for the active user sorted by date")
    public ResponseEntity<ApiResponse<List<NotificationDto>>> getUnreadNotifications(Principal principal) {
        List<NotificationDto> notifications = notificationService.getUnreadNotificationsForUser(principal.getName());
        return ResponseEntity.ok(ApiResponse.success(notifications, "Unread notifications list retrieved"));
    }

    @PostMapping("/{id}/read")
    @Operation(summary = "Marks a specific notification alert as read")
    public ResponseEntity<ApiResponse<NotificationDto>> markAsRead(@PathVariable UUID id, Principal principal) {
        NotificationDto notification = notificationService.markAsRead(id, principal.getName());
        return ResponseEntity.ok(ApiResponse.success(notification, "Notification marked as read"));
    }
}
