package com.hotel.system.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "maintenance_tickets")
public class MaintenanceTicket {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "room_id")
    private Room room;

    private String issueDescription;
    private String priority; // Low, Medium, High, Critical
    private String status = "Open"; // Open, In Progress, Resolved
    private LocalDate reportedDate;

    public MaintenanceTicket() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Room getRoom() { return room; }
    public void setRoom(Room room) { this.room = room; }
    public String getIssueDescription() { return issueDescription; }
    public void setIssueDescription(String issueDescription) { this.issueDescription = issueDescription; }
    public String getPriority() { return priority; }
    public void setPriority(String priority) { this.priority = priority; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public LocalDate getReportedDate() { return reportedDate; }
    public void setReportedDate(LocalDate reportedDate) { this.reportedDate = reportedDate; }
}
