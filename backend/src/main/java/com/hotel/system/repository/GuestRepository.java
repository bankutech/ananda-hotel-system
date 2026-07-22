package com.hotel.system.repository;
import com.hotel.system.model.Guest;
import org.springframework.data.jpa.repository.JpaRepository;
public interface GuestRepository extends JpaRepository<Guest, Long> {}
