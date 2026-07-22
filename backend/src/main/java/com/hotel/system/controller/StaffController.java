package com.hotel.system.controller;

import com.hotel.system.model.Staff;
import com.hotel.system.model.TimeClockLog;
import com.hotel.system.model.ShiftMessage;
import com.hotel.system.repository.StaffRepository;
import com.hotel.system.repository.TimeClockLogRepository;
import com.hotel.system.repository.ShiftMessageRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/staff")
public class StaffController {

    private final StaffRepository staffRepo;
    private final TimeClockLogRepository clockRepo;
    private final ShiftMessageRepository msgRepo;

    public StaffController(StaffRepository staffRepo, TimeClockLogRepository clockRepo, ShiftMessageRepository msgRepo) {
        this.staffRepo = staffRepo;
        this.clockRepo = clockRepo;
        this.msgRepo = msgRepo;
    }

    @GetMapping
    public List<Staff> getAllStaff() {
        return staffRepo.findAll();
    }

    @PostMapping
    public Staff addStaff(@RequestBody Staff staff) {
        return staffRepo.save(staff);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Staff> updateStaff(@PathVariable Long id, @RequestBody Staff staffDetails) {
        return staffRepo.findById(id).map(staff -> {
            staff.setName(staffDetails.getName());
            staff.setRole(staffDetails.getRole());
            staff.setShift(staffDetails.getShift());
            staff.setStatus(staffDetails.getStatus());
            return ResponseEntity.ok(staffRepo.save(staff));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStaff(@PathVariable Long id) {
        if(staffRepo.existsById(id)) {
            staffRepo.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/logs")
    public List<TimeClockLog> getAllLogs() {
        return clockRepo.findAll();
    }

    @PostMapping("/{id}/clock-in")
    public ResponseEntity<TimeClockLog> clockIn(@PathVariable Long id) {
        return staffRepo.findById(id).map(s -> {
            TimeClockLog log = new TimeClockLog();
            log.setStaff(s);
            log.setClockInTime(LocalDateTime.now());
            return ResponseEntity.ok(clockRepo.save(log));
        }).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/logs/{logId}/clock-out")
    public ResponseEntity<TimeClockLog> clockOut(@PathVariable Long logId) {
        return clockRepo.findById(logId).map(log -> {
            log.setClockOutTime(LocalDateTime.now());
            return ResponseEntity.ok(clockRepo.save(log));
        }).orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/messages")
    public List<ShiftMessage> getAllMessages() {
        return msgRepo.findAll();
    }

    @PostMapping("/messages")
    public ShiftMessage postMessage(@RequestBody ShiftMessage msg) {
        msg.setTimestamp(LocalDateTime.now());
        return msgRepo.save(msg);
    }
}
