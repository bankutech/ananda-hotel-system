package com.hotel.system.controller;

import com.hotel.system.model.LuggageTicket;
import com.hotel.system.repository.LuggageTicketRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/luggage")
public class LuggageController {

    private final LuggageTicketRepository luggageRepo;

    public LuggageController(LuggageTicketRepository luggageRepo) {
        this.luggageRepo = luggageRepo;
    }

    @GetMapping
    public ResponseEntity<List<LuggageTicket>> listLuggage() {
        return ResponseEntity.ok(luggageRepo.findAll());
    }

    @PostMapping("/add")
    public ResponseEntity<LuggageTicket> addTicket(@RequestBody LuggageTicket ticket) {
        ticket.setTimeStored(LocalDateTime.now());
        ticket.setStatus("Stored"); // default status
        return ResponseEntity.ok(luggageRepo.save(ticket));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<LuggageTicket> updateStatus(@PathVariable Long id, @RequestParam String status) {
        return luggageRepo.findById(id).map(ticket -> {
            ticket.setStatus(status);
            return ResponseEntity.ok(luggageRepo.save(ticket));
        }).orElse(ResponseEntity.notFound().build());
    }
}
