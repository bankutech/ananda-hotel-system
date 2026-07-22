package com.hotel.system.controller;

import com.hotel.system.model.MaintenanceTicket;
import com.hotel.system.model.Room;
import com.hotel.system.repository.MaintenanceTicketRepository;
import com.hotel.system.repository.RoomRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/maintenance")
public class MaintenanceController {

    private final MaintenanceTicketRepository ticketRepo;
    private final RoomRepository roomRepo;

    public MaintenanceController(MaintenanceTicketRepository ticketRepo, RoomRepository roomRepo) {
        this.ticketRepo = ticketRepo;
        this.roomRepo = roomRepo;
    }

    @GetMapping
    public ResponseEntity<List<MaintenanceTicket>> listTickets() {
        return ResponseEntity.ok(ticketRepo.findAll());
    }

    @PostMapping("/add")
    public ResponseEntity<MaintenanceTicket> addTicket(@RequestBody MaintenanceTicket ticket) {
        ticket.setReportedDate(LocalDate.now());
        
        // If high/critical priority, set room to OutOfOrder
        if(ticket.getPriority().equals("Critical") || ticket.getPriority().equals("High")) {
            roomRepo.findById(ticket.getRoom().getId()).ifPresent(room -> {
                room.setMaintenanceStatus("OutOfOrder");
                roomRepo.save(room);
            });
        }
        
        return ResponseEntity.ok(ticketRepo.save(ticket));
    }

    @PutMapping("/resolve/{id}")
    public ResponseEntity<MaintenanceTicket> resolveTicket(@PathVariable Long id) {
        return ticketRepo.findById(id).map(ticket -> {
            ticket.setStatus("Resolved");
            Room room = ticket.getRoom();
            if (room != null) {
                room.setMaintenanceStatus("Operational");
                roomRepo.save(room);
            }
            return ResponseEntity.ok(ticketRepo.save(ticket));
        }).orElse(ResponseEntity.notFound().build());
    }
}
