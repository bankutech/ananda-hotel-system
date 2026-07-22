package com.hotel.system.repository;
import com.hotel.system.model.RoomServiceOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoomServiceOrderRepository extends JpaRepository<RoomServiceOrder, Long> {}
