package com.hotel.system.repository;
import com.hotel.system.model.Staff;
import org.springframework.data.jpa.repository.JpaRepository;
public interface StaffRepository extends JpaRepository<Staff, Long> {}
