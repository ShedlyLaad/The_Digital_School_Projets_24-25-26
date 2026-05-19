package com.example.loc.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.loc.entities.Reservation;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
}