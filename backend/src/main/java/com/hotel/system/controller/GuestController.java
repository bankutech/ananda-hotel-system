package com.hotel.system.controller;

import com.hotel.system.model.Guest;
import com.hotel.system.repository.GuestRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import java.util.List;

@RestController
@RequestMapping("/api/guests")
public class GuestController {

    private final GuestRepository guestRepo;

    public GuestController(GuestRepository guestRepo) {
        this.guestRepo = guestRepo;
    }

    @GetMapping
    public List<Guest> getAllGuests() {
        return guestRepo.findAll();
    }

    @GetMapping("/paged")
    public Page<Guest> getPagedGuests(Pageable pageable) {
        return guestRepo.findAll(pageable);
    }

    @PostMapping
    public Guest addGuest(@RequestBody Guest guest) {
        return guestRepo.save(guest);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Guest> updateGuest(@PathVariable Long id, @RequestBody Guest guestDetails) {
        return guestRepo.findById(id).map(guest -> {
            guest.setName(guestDetails.getName());
            guest.setPhone(guestDetails.getPhone());
            guest.setEmail(guestDetails.getEmail());
            guest.setIdDocument(guestDetails.getIdDocument());
            guest.setLoyaltyPoints(guestDetails.getLoyaltyPoints());
            guest.setStatus(guestDetails.getStatus());
            Guest updatedGuest = guestRepo.save(guest);
            return ResponseEntity.ok(updatedGuest);
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGuest(@PathVariable Long id) {
        if(guestRepo.existsById(id)) {
            guestRepo.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
