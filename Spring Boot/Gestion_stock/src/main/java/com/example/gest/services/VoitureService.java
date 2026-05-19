package com.example.gest.services;

import java.util.List;

import com.example.gest.entities.Voiture;

public interface VoitureService {
    List<Voiture> getAllVoitures();
    Voiture getVoitureById(int immatriculation);
    Voiture saveVoiture(Voiture voiture);
    Voiture updateVoiture(int immatriculation, Voiture voiture);
    void deleteVoiture(int immatriculation);
}
