package com.hotel.system.repository;
import com.hotel.system.model.ShiftMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ShiftMessageRepository extends JpaRepository<ShiftMessage, Long> {
}
