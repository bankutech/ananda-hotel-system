package com.hotel.system.controller;

import com.hotel.system.model.Booking;
import com.hotel.system.model.Room;
import com.hotel.system.repository.BookingRepository;
import com.hotel.system.repository.GuestRepository;
import com.hotel.system.repository.RoomRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import java.time.temporal.ChronoUnit;
import java.util.List;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    private final BookingRepository bookingRepo;
    private final GuestRepository guestRepo;
    private final RoomRepository roomRepo;

    public BookingController(BookingRepository bookingRepo, GuestRepository guestRepo, RoomRepository roomRepo) {
        this.bookingRepo = bookingRepo;
        this.guestRepo = guestRepo;
        this.roomRepo = roomRepo;
    }

    @GetMapping
    public List<Booking> getAllBookings() {
        return bookingRepo.findAll();
    }

    @GetMapping("/paged")
    public Page<Booking> getPagedBookings(Pageable pageable) {
        return bookingRepo.findAll(pageable);
    }

    @PostMapping
    public ResponseEntity<Booking> addBooking(@Valid @RequestBody Booking booking) {
        if(booking.getRoom() == null || booking.getRoom().getId() == null) {
            return ResponseEntity.badRequest().build();
        }
        
        Room room = roomRepo.findById(booking.getRoom().getId()).orElse(null);
        if(room == null) return ResponseEntity.badRequest().build();

        long days = ChronoUnit.DAYS.between(booking.getCheckIn(), booking.getCheckOut());
        if(days < 1) days = 1;
        booking.setTotalCost(room.getPrice() * days);
        
        if("active".equals(booking.getStatus())) {
            room.setStatus("occupied");
            roomRepo.save(room);
        }
        
        Booking savedBooking = bookingRepo.save(booking);
        return ResponseEntity.ok(savedBooking);
    }

    @PostMapping("/{id}/checkout")
    public ResponseEntity<Booking> checkoutBooking(@PathVariable Long id) {
        return bookingRepo.findById(id).map(booking -> {
            booking.setStatus("completed");
            Room room = booking.getRoom();
            if(room != null) {
                room.setStatus("available");
                roomRepo.save(room);
            }
            return ResponseEntity.ok(bookingRepo.save(booking));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBooking(@PathVariable Long id) {
        if(bookingRepo.existsById(id)) {
            bookingRepo.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
