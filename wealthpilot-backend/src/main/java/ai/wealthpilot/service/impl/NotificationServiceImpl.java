package ai.wealthpilot.service.impl;

import ai.wealthpilot.dto.notification.NotificationDto;
import ai.wealthpilot.exception.ApiException;
import ai.wealthpilot.exception.ResourceNotFoundException;
import ai.wealthpilot.mapper.NotificationMapper;
import ai.wealthpilot.model.entity.Notification;
import ai.wealthpilot.model.entity.User;
import ai.wealthpilot.model.enums.NotificationType;
import ai.wealthpilot.repository.NotificationRepository;
import ai.wealthpilot.repository.UserRepository;
import ai.wealthpilot.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {

    private final UserRepository userRepository;
    private final NotificationRepository notificationRepository;
    private final NotificationMapper notificationMapper;

    @Override
    public List<NotificationDto> getNotificationsForUser(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", email));

        List<Notification> notifications = notificationRepository.findByUserIdOrderByCreatedAtDesc(user.getId());
        return notifications.stream()
                .map(notificationMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<NotificationDto> getUnreadNotificationsForUser(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", email));

        List<Notification> notifications = notificationRepository.findByUserIdAndReadFalseOrderByCreatedAtDesc(user.getId());
        return notifications.stream()
                .map(notificationMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public NotificationDto markAsRead(UUID id, String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", email));

        Notification notification = notificationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Notification", "id", id.toString()));

        if (!notification.getUser().getId().equals(user.getId())) {
            throw new ApiException("Access Denied: You do not own this notification", HttpStatus.FORBIDDEN);
        }

        notification.setRead(true);
        Notification saved = notificationRepository.save(notification);
        return notificationMapper.toDto(saved);
    }

    @Override
    @Transactional
    public void sendNotification(UUID userId, String title, String message, String type) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId.toString()));

        NotificationType nType;
        try {
            nType = NotificationType.valueOf(type.toUpperCase());
        } catch (IllegalArgumentException e) {
            nType = NotificationType.SYSTEM_UPDATE;
        }

        Notification notification = Notification.builder()
                .user(user)
                .title(title)
                .message(message)
                .type(nType)
                .read(false)
                .build();

        notificationRepository.save(notification);
    }
}
