package com.hotel.system.controller;

import com.hotel.system.repository.BookingRepository;
import com.hotel.system.repository.InvoiceRepository;
import com.hotel.system.repository.RoomRepository;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.http.ResponseEntity;
import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api/analytics")
public class AnalyticsController {

    private final RoomRepository roomRepo;
    private final BookingRepository bookingRepo;
    private final InvoiceRepository invoiceRepo;

    public AnalyticsController(RoomRepository roomRepo, BookingRepository bookingRepo, InvoiceRepository invoiceRepo) {
        this.roomRepo = roomRepo;
        this.bookingRepo = bookingRepo;
        this.invoiceRepo = invoiceRepo;
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> getAnalytics() {
        long totalRooms = roomRepo.count();
        long occupiedRooms = roomRepo.findAll().stream().filter(r -> "occupied".equals(r.getStatus())).count();
        
        double occupancyRate = (totalRooms > 0) ? ((double) occupiedRooms / totalRooms) * 100 : 0;
        
        // Mock ADR (Average Daily Rate) and RevPAR
        double adr = 245.50; 
        double revpar = (adr * occupancyRate) / 100;
        
        Map<String, Object> data = new HashMap<>();
        data.put("occupancyRate", String.format("%.1f", occupancyRate));
        data.put("adr", String.format("%.2f", adr));
        data.put("revpar", String.format("%.2f", revpar));
        data.put("totalRooms", totalRooms);
        
        return ResponseEntity.ok(data);
    }
}
