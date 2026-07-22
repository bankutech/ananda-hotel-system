package com.hotel.system.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "time_clock_logs")
public class TimeClockLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "staff_id")
    private Staff staff;

    private LocalDateTime clockInTime;
    private LocalDateTime clockOutTime;

    public TimeClockLog() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Staff getStaff() { return staff; }
    public void setStaff(Staff staff) { this.staff = staff; }
    public LocalDateTime getClockInTime() { return clockInTime; }
    public void setClockInTime(LocalDateTime clockInTime) { this.clockInTime = clockInTime; }
    public LocalDateTime getClockOutTime() { return clockOutTime; }
    public void setClockOutTime(LocalDateTime clockOutTime) { this.clockOutTime = clockOutTime; }
}
