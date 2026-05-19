package com.example.loc.controllers;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.loc.entities.Reservation;
import com.example.loc.service.ReservationService;

@RestController
@RequestMapping("/reservations")
public class ReservationController {

    @Autowired
    private ReservationService reservationService;

    @PostMapping
    public ResponseEntity<Reservation> ajouterReservation(@RequestBody Reservation reservation) {
        return ResponseEntity.ok(reservationService.ajouterReservation(reservation));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> supprimerReservation(@PathVariable Long id) {
        reservationService.supprimerReservation(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<List<Reservation>> getAllReservations() {
        return ResponseEntity.ok(reservationService.getAllReservations());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Reservation> updateReservation(@PathVariable Long id, @RequestBody Reservation reservation) {
        Reservation updatedReservation = reservationService.updateReservation(id, reservation);
        return updatedReservation != null ? ResponseEntity.ok(updatedReservation) : ResponseEntity.notFound().build();
    }
}