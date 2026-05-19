package com.example.loc.service;

import java.util.List;
import com.example.loc.entities.Reservation;

public interface ReservationService {
    Reservation ajouterReservation(Reservation reservation);
    void supprimerReservation(Long id);
    List<Reservation> getAllReservations();
    Reservation updateReservation(Long id, Reservation reservation);
}
