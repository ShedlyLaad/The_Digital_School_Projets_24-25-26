package com.example.loc.service;

import java.util.List;
import com.example.loc.entities.Vehicule;

public interface VehiculeService {
    Vehicule ajouterVehicule(Vehicule v);
    void supprimerVehicule(Vehicule v);
    void supprimerVehicule(Long id);
    List<Vehicule> getAllVehicules();
    Vehicule updateVehicule(Long id, Vehicule vehicule);
}