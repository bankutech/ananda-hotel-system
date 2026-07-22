package com.hotel.system.repository;
import com.hotel.system.model.POSCharge;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface POSChargeRepository extends JpaRepository<POSCharge, Long> {}
