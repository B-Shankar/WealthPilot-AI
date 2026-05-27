package ai.wealthpilot.repository;

import ai.wealthpilot.model.entity.Meeting;
import ai.wealthpilot.model.enums.MeetingStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface MeetingRepository extends JpaRepository<Meeting, UUID> {
    List<Meeting> findByClientIdOrderByScheduledAtDesc(UUID clientId);
    List<Meeting> findByUserIdOrderByScheduledAtDesc(UUID userId);
    List<Meeting> findByUserIdAndStatusOrderByScheduledAtDesc(UUID userId, MeetingStatus status);
}
