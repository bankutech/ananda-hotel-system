package com.hotel.system.repository;
import com.hotel.system.model.TimeClockLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface TimeClockLogRepository extends JpaRepository<TimeClockLog, Long> {
    List<TimeClockLog> findByStaffIdOrderByClockInTimeDesc(Long staffId);
}
