package ai.wealthpilot.service;

import ai.wealthpilot.dto.notification.NotificationDto;

import java.util.List;
import java.util.UUID;

public interface NotificationService {
    List<NotificationDto> getNotificationsForUser(String email);
    List<NotificationDto> getUnreadNotificationsForUser(String email);
    NotificationDto markAsRead(UUID id, String email);
    void sendNotification(UUID userId, String title, String message, String type);
}
