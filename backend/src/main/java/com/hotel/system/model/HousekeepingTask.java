package com.hotel.system.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "housekeeping_tasks")
public class HousekeepingTask {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "room_id")
    private Room room;

    @ManyToOne
    @JoinColumn(name = "staff_id")
    private Staff staff; // Assigned maid

    private String taskType; // Light Clean, Deep Clean, Turndown
    private String status = "Pending"; // Pending, In Progress, Completed
    private LocalDate taskDate;

    public HousekeepingTask() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Room getRoom() { return room; }
    public void setRoom(Room room) { this.room = room; }
    public Staff getStaff() { return staff; }
    public void setStaff(Staff staff) { this.staff = staff; }
    public String getTaskType() { return taskType; }
    public void setTaskType(String taskType) { this.taskType = taskType; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public LocalDate getTaskDate() { return taskDate; }
    public void setTaskDate(LocalDate taskDate) { this.taskDate = taskDate; }
}
