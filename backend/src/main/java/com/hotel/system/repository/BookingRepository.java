package com.hotel.system.repository;
import com.hotel.system.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
public interface BookingRepository extends JpaRepository<Booking, Long> {}
