package com.hotel.system.repository;
import com.hotel.system.model.LuggageTicket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LuggageTicketRepository extends JpaRepository<LuggageTicket, Long> {}
