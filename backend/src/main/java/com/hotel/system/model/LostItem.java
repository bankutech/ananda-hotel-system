package com.hotel.system.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "lost_items")
public class LostItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String description;
    private String foundLocation; // e.g., Room 101, Lobby
    private LocalDate dateFound;
    private String status = "Unclaimed"; // Unclaimed, Claimed, Disposed

    public LostItem() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getFoundLocation() { return foundLocation; }
    public void setFoundLocation(String foundLocation) { this.foundLocation = foundLocation; }
    public LocalDate getDateFound() { return dateFound; }
    public void setDateFound(LocalDate dateFound) { this.dateFound = dateFound; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
