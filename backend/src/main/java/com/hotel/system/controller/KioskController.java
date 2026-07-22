package com.hotel.system.controller;

import com.hotel.system.model.POSCharge;
import com.hotel.system.model.Booking;
import com.hotel.system.repository.POSChargeRepository;
import com.hotel.system.repository.BookingRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/kiosk")
public class KioskController {

    private final POSChargeRepository posRepo;
    private final BookingRepository bookingRepo;

    public KioskController(POSChargeRepository posRepo, BookingRepository bookingRepo) {
        this.posRepo = posRepo;
        this.bookingRepo = bookingRepo;
    }

    @GetMapping("/charges")
    public ResponseEntity<List<POSCharge>> listRecentCharges() {
        return ResponseEntity.ok(posRepo.findAll());
    }

    @PostMapping("/charge")
    public ResponseEntity<POSCharge> postCharge(@RequestParam Long bookingId, @RequestParam String itemName, @RequestParam double amount) {
        return bookingRepo.findById(bookingId).map(b -> {
            POSCharge charge = new POSCharge();
            charge.setBooking(b);
            charge.setItemName(itemName);
            charge.setAmount(amount);
            charge.setChargeTime(LocalDateTime.now());
            return ResponseEntity.ok(posRepo.save(charge));
        }).orElse(ResponseEntity.notFound().build());
    }
}
