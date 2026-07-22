package com.hotel.system.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;

@Entity
@Table(name = "guests")
public class Guest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Name is required")
    private String name;
    
    private String phone;
    
    @Email(message = "Invalid email format")
    private String email;
    
    private String idDocument;
    private int loyaltyPoints = 0; // Phase 2 loyalty tracking
    private String status = "Standard"; // Standard, VIP, Blacklisted

    public Guest() {}

    public Guest(String name, String phone, String email, String idDocument) {
        this.name = name;
        this.phone = phone;
        this.email = email;
        this.idDocument = idDocument;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getIdDocument() { return idDocument; }
    public void setIdDocument(String idDocument) { this.idDocument = idDocument; }
    public int getLoyaltyPoints() { return loyaltyPoints; }
    public void setLoyaltyPoints(int loyaltyPoints) { this.loyaltyPoints = loyaltyPoints; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
