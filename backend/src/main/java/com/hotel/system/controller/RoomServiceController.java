package com.hotel.system.controller;

import com.hotel.system.model.RoomServiceOrder;
import com.hotel.system.repository.RoomServiceOrderRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/room-service")
public class RoomServiceController {

    private final RoomServiceOrderRepository orderRepo;

    public RoomServiceController(RoomServiceOrderRepository orderRepo) {
        this.orderRepo = orderRepo;
    }

    @GetMapping
    public ResponseEntity<List<RoomServiceOrder>> listOrders() {
        return ResponseEntity.ok(orderRepo.findAll());
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<RoomServiceOrder> updateStatus(@PathVariable Long id, @RequestParam String status) {
        return orderRepo.findById(id).map(order -> {
            order.setStatus(status);
            return ResponseEntity.ok(orderRepo.save(order));
        }).orElse(ResponseEntity.notFound().build());
    }
}
