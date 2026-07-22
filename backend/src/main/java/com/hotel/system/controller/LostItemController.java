package com.hotel.system.controller;

import com.hotel.system.model.LostItem;
import com.hotel.system.repository.LostItemRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/lost-and-found")
public class LostItemController {

    private final LostItemRepository lostRepo;

    public LostItemController(LostItemRepository lostRepo) {
        this.lostRepo = lostRepo;
    }

    @GetMapping
    public ResponseEntity<List<LostItem>> listLostItems() {
        return ResponseEntity.ok(lostRepo.findAll());
    }

    @PostMapping("/add")
    public ResponseEntity<LostItem> addLostItem(@RequestBody LostItem item) {
        item.setDateFound(LocalDate.now());
        item.setStatus("Found"); // Default status
        return ResponseEntity.ok(lostRepo.save(item));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<LostItem> updateStatus(@PathVariable Long id, @RequestParam String status) {
        return lostRepo.findById(id).map(item -> {
            item.setStatus(status);
            return ResponseEntity.ok(lostRepo.save(item));
        }).orElse(ResponseEntity.notFound().build());
    }
}
