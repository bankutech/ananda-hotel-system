package com.hotel.system.repository;
import com.hotel.system.model.HousekeepingTask;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HousekeepingTaskRepository extends JpaRepository<HousekeepingTask, Long> {}
