package com.example.loc.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.loc.entities.Reservation;
import com.example.loc.repository.ReservationRepository;

@Service
public class ReservationServiceImp implements ReservationService {
    
    @Autowired
    private ReservationRepository reservationRep;

    @Override
    public Reservation ajouterReservation(Reservation reservation) {
        calculateAndSetTotalPrice(reservation);
        return reservationRep.save(reservation);
    }

    @Override
    public void supprimerReservation(Long id) {
        reservationRep.deleteById(id);
    }

    @Override
    public List<Reservation> getAllReservations() {
        return reservationRep.findAll();
    }

    @Override
    public Reservation updateReservation(Long id, Reservation reservation) {
        if (reservationRep.existsById(id)) {
            reservation.setId(id);
            calculateAndSetTotalPrice(reservation);
            return reservationRep.save(reservation);
        }
        return null;
    }

    private void calculateAndSetTotalPrice(Reservation reservation) {
        if (reservation.getDateDebut() != null && reservation.getDateFin() != null && reservation.getVehicule() != null) {
            long durationInDays = java.time.Duration.between(reservation.getDateDebut(), reservation.getDateFin()).toDays();
            float pricePerDay = reservation.getVehicule().getPrixJ();
            reservation.setPrixT(durationInDays * pricePerDay);
        } else {
            reservation.setPrixT(0.0f);
        }
    }
}
