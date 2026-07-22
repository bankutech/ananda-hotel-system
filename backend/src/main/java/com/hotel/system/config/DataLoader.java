package com.hotel.system.config;

import com.hotel.system.model.Room;
import com.hotel.system.model.Guest;
import com.hotel.system.model.Booking;
import com.hotel.system.model.Staff;
import com.hotel.system.repository.RoomRepository;
import com.hotel.system.repository.GuestRepository;
import com.hotel.system.repository.BookingRepository;
import com.hotel.system.repository.StaffRepository;
import com.hotel.system.model.MenuItem;
import com.hotel.system.repository.MenuItemRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import java.time.LocalDate;

@Configuration
public class DataLoader {

    @Bean
    CommandLineRunner initDatabase(RoomRepository roomRepo, GuestRepository guestRepo, BookingRepository bookingRepo, StaffRepository staffRepo, MenuItemRepository menuRepo) {
        return args -> {
            Room r1 = roomRepo.save(new Room("101", "Classic Single", 150.00, "available"));
            Room r2 = roomRepo.save(new Room("102", "Classic Double", 200.00, "occupied"));
            Room r3 = roomRepo.save(new Room("201", "Deluxe Suite", 350.00, "available"));
            Room r4 = roomRepo.save(new Room("301", "Penthouse", 800.00, "available"));

            Guest g1 = guestRepo.save(new Guest("John Doe", "123-456-7890", "john@example.com", "PASS123"));
            g1.setLoyaltyPoints(500);
            guestRepo.save(g1);

            Booking b1 = new Booking();
            b1.setRoom(r2);
            b1.setGuest(g1);
            b1.setCheckIn(LocalDate.now());
            b1.setCheckOut(LocalDate.now().plusDays(3));
            b1.setStatus("active");
            b1.setTotalCost(600.00);
            bookingRepo.save(b1);

            staffRepo.save(new Staff("Alice Smith", "Front Desk", "Morning", "Active"));
            staffRepo.save(new Staff("Bob Jones", "Housekeeping", "Evening", "Active"));
            
            // Phase 2: Mock Menu
            MenuItem m1 = new MenuItem(); m1.setName("Truffle Fries"); m1.setPrice(15.00); m1.setCategory("Snacks"); menuRepo.save(m1);
            MenuItem m2 = new MenuItem(); m2.setName("Wagyu Burger"); m2.setPrice(45.00); m2.setCategory("Dinner"); menuRepo.save(m2);
            MenuItem m3 = new MenuItem(); m3.setName("Champagne"); m3.setPrice(120.00); m3.setCategory("Drinks"); menuRepo.save(m3);
        };
    }
}
