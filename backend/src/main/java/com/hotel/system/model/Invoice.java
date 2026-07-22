package com.hotel.system.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "invoices")
public class Invoice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "booking_id")
    private Booking booking;

    private double roomCharges;
    private double incidentals;
    private double taxes;
    private double totalAmount;
    private String status = "Unpaid"; // Unpaid, Paid, Void
    private LocalDate issuedDate;

    public Invoice() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Booking getBooking() { return booking; }
    public void setBooking(Booking booking) { this.booking = booking; }
    public double getRoomCharges() { return roomCharges; }
    public void setRoomCharges(double roomCharges) { this.roomCharges = roomCharges; }
    public double getIncidentals() { return incidentals; }
    public void setIncidentals(double incidentals) { this.incidentals = incidentals; }
    public double getTaxes() { return taxes; }
    public void setTaxes(double taxes) { this.taxes = taxes; }
    public double getTotalAmount() { return totalAmount; }
    public void setTotalAmount(double totalAmount) { this.totalAmount = totalAmount; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public LocalDate getIssuedDate() { return issuedDate; }
    public void setIssuedDate(LocalDate issuedDate) { this.issuedDate = issuedDate; }
}
