package com.hotel.system.controller;

import com.hotel.system.model.Invoice;
import com.hotel.system.model.Booking;
import com.hotel.system.repository.InvoiceRepository;
import com.hotel.system.repository.BookingRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/invoices")
public class InvoiceController {

    private final InvoiceRepository invoiceRepo;
    private final BookingRepository bookingRepo;

    public InvoiceController(InvoiceRepository invoiceRepo, BookingRepository bookingRepo) {
        this.invoiceRepo = invoiceRepo;
        this.bookingRepo = bookingRepo;
    }

    @GetMapping
    public ResponseEntity<List<Invoice>> listInvoices() {
        return ResponseEntity.ok(invoiceRepo.findAll());
    }

    @PostMapping("/generate/{bookingId}")
    public ResponseEntity<Invoice> generateInvoice(@PathVariable Long bookingId) {
        return bookingRepo.findById(bookingId).map(booking -> {
            Invoice invoice = new Invoice();
            invoice.setBooking(booking);
            invoice.setRoomCharges(booking.getTotalCost());
            invoice.setIncidentals(0.0); // Simulated
            invoice.setTaxes(booking.getTotalCost() * 0.10); // 10% tax
            invoice.setTotalAmount(invoice.getRoomCharges() + invoice.getIncidentals() + invoice.getTaxes());
            invoice.setIssuedDate(LocalDate.now());
            invoice.setStatus("Pending");
            return ResponseEntity.ok(invoiceRepo.save(invoice));
        }).orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/pay/{id}")
    public ResponseEntity<Invoice> payInvoice(@PathVariable Long id) {
        return invoiceRepo.findById(id).map(invoice -> {
            invoice.setStatus("Paid");
            return ResponseEntity.ok(invoiceRepo.save(invoice));
        }).orElse(ResponseEntity.notFound().build());
    }
}
