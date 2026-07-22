package com.hotel.system.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.*;

@Entity
@Table(name = "rooms")
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Room number is required")
    private String number;
    
    @NotBlank(message = "Room type is required")
    private String type;
    
    @Min(value = 0, message = "Price cannot be negative")
    private double price;
    
    @NotBlank(message = "Status is required")
    private String status; // available, occupied
    private String cleaningStatus = "Clean"; // Clean, Dirty, Inspect
    private String maintenanceStatus = "OK"; // OK, OutOfOrder
    private boolean dndStatus = false; // Do Not Disturb

    public Room() {}

    public Room(String number, String type, double price, String status) {
        this.number = number;
        this.type = type;
        this.price = price;
        this.status = status;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getNumber() { return number; }
    public void setNumber(String number) { this.number = number; }
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getCleaningStatus() { return cleaningStatus; }
    public void setCleaningStatus(String cleaningStatus) { this.cleaningStatus = cleaningStatus; }
    public String getMaintenanceStatus() { return maintenanceStatus; }
    public void setMaintenanceStatus(String maintenanceStatus) { this.maintenanceStatus = maintenanceStatus; }
    public boolean isDndStatus() { return dndStatus; }
    public void setDndStatus(boolean dndStatus) { this.dndStatus = dndStatus; }
}
