package com.hotel.system.controller;

import com.hotel.system.repository.RoomRepository;
import com.hotel.system.repository.GuestRepository;
import com.hotel.system.repository.BookingRepository;
import com.hotel.system.repository.StaffRepository;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.http.ResponseEntity;

@RestController
public class DashboardController {

    @GetMapping("/api/legacy-dashboard")
    public ResponseEntity<String> dashboard() {
        return ResponseEntity.ok("Legacy dashboard removed. Use /api/analytics instead.");
    }
}
