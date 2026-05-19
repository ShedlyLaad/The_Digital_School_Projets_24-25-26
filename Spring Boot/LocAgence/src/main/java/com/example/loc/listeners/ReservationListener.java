package com.example.loc.listeners;

import com.example.loc.entities.Reservation;

import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;

public class ReservationListener {

    @PrePersist
    @PreUpdate
    public void calculateTotalPrice(Reservation reservation) {
        if (reservation.getDateDebut() != null && reservation.getDateFin() != null && reservation.getVehicule() != null) {
            long durationInDays = java.time.Duration.between(
                    reservation.getDateDebut().toLocalDate().atStartOfDay(),
                    reservation.getDateFin().toLocalDate().atStartOfDay()
            ).toDays();

            float pricePerDay = reservation.getVehicule().getPrixJ();
            reservation.setPrixT(durationInDays * pricePerDay);
        } else {
            reservation.setPrixT(0.0f);
        }
    }
}
