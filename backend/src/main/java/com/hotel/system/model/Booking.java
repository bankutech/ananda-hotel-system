package com.hotel.system.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "bookings")
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "room_id")
    @NotNull(message = "Room is required")
    private Room room;

    @ManyToOne
    @JoinColumn(name = "guest_id")
    @NotNull(message = "Guest is required")
    private Guest guest;

    @NotNull(message = "Check-in date is required")
    private LocalDate checkIn;

    @NotNull(message = "Check-out date is required")
    private LocalDate checkOut;

    @NotNull(message = "Total cost is required")
    @Min(value = 0, message = "Total cost cannot be negative")
    private Double totalCost;

    @NotBlank(message = "Status is required")
    private String status; // active, completed, cancelled

    @OneToMany(mappedBy = "booking", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ServiceCharge> services = new ArrayList<>();

    public Booking() {}

    public Booking(Room room, Guest guest, LocalDate checkIn, LocalDate checkOut, Double totalCost, String status) {
        this.room = room;
        this.guest = guest;
        this.checkIn = checkIn;
        this.checkOut = checkOut;
        this.totalCost = totalCost;
        this.status = status;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Room getRoom() { return room; }
    public void setRoom(Room room) { this.room = room; }
    public Guest getGuest() { return guest; }
    public void setGuest(Guest guest) { this.guest = guest; }
    public LocalDate getCheckIn() { return checkIn; }
    public void setCheckIn(LocalDate checkIn) { this.checkIn = checkIn; }
    public LocalDate getCheckOut() { return checkOut; }
    public void setCheckOut(LocalDate checkOut) { this.checkOut = checkOut; }
    public Double getTotalCost() { return totalCost; }
    public void setTotalCost(Double totalCost) { this.totalCost = totalCost; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public List<ServiceCharge> getServices() { return services; }
    public void setServices(List<ServiceCharge> services) { this.services = services; }
}
