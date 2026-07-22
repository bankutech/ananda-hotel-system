package com.hotel.system.controller;

import com.hotel.system.repository.RoomRepository;
import com.hotel.system.model.Room;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/housekeeping")
public class HousekeepingController {

    private final RoomRepository roomRepo;

    public HousekeepingController(RoomRepository roomRepo) {
        this.roomRepo = roomRepo;
    }

    @GetMapping
    public ResponseEntity<List<Room>> getHousekeepingRooms() {
        return ResponseEntity.ok(roomRepo.findAll());
    }

    @PutMapping("/clean/{id}")
    public ResponseEntity<Room> markRoomClean(@PathVariable Long id) {
        return roomRepo.findById(id).map(room -> {
            room.setCleaningStatus("Clean");
            return ResponseEntity.ok(roomRepo.save(room));
        }).orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/dirty/{id}")
    public ResponseEntity<Room> markRoomDirty(@PathVariable Long id) {
        return roomRepo.findById(id).map(room -> {
            room.setCleaningStatus("Dirty");
            return ResponseEntity.ok(roomRepo.save(room));
        }).orElse(ResponseEntity.notFound().build());
    }
}
