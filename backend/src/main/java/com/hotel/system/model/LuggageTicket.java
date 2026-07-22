package com.hotel.system.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "luggage_tickets")
public class LuggageTicket {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String guestName;
    private String roomNumber;
    private int bagCount;
    private String tagNumbers;
    private LocalDateTime timeStored;
    private String status = "Stored"; // Stored, Retrieved

    public LuggageTicket() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getGuestName() { return guestName; }
    public void setGuestName(String guestName) { this.guestName = guestName; }
    public String getRoomNumber() { return roomNumber; }
    public void setRoomNumber(String roomNumber) { this.roomNumber = roomNumber; }
    public int getBagCount() { return bagCount; }
    public void setBagCount(int bagCount) { this.bagCount = bagCount; }
    public String getTagNumbers() { return tagNumbers; }
    public void setTagNumbers(String tagNumbers) { this.tagNumbers = tagNumbers; }
    public LocalDateTime getTimeStored() { return timeStored; }
    public void setTimeStored(LocalDateTime timeStored) { this.timeStored = timeStored; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
