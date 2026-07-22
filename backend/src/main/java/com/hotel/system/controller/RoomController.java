package com.hotel.system.controller;

import com.hotel.system.model.Room;
import com.hotel.system.repository.RoomRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/rooms")
public class RoomController {

    private final RoomRepository roomRepo;

    public RoomController(RoomRepository roomRepo) {
        this.roomRepo = roomRepo;
    }

    @GetMapping
    public List<Room> getAllRooms() {
        return roomRepo.findAll();
    }

    @GetMapping("/paged")
    public Page<Room> getPagedRooms(Pageable pageable) {
        return roomRepo.findAll(pageable);
    }

    @PostMapping
    public Room addRoom(@Valid @RequestBody Room room) {
        return roomRepo.save(room);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Room> updateRoom(@PathVariable Long id, @Valid @RequestBody Room roomDetails) {
        return roomRepo.findById(id).map(room -> {
            room.setNumber(roomDetails.getNumber());
            room.setType(roomDetails.getType());
            room.setPrice(roomDetails.getPrice());
            room.setStatus(roomDetails.getStatus());
            room.setCleaningStatus(roomDetails.getCleaningStatus());
            room.setMaintenanceStatus(roomDetails.getMaintenanceStatus());
            room.setDndStatus(roomDetails.isDndStatus());
            Room updatedRoom = roomRepo.save(room);
            return ResponseEntity.ok(updatedRoom);
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRoom(@PathVariable Long id) {
        if(roomRepo.existsById(id)) {
            roomRepo.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
