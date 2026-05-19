package com.example.gest.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.gest.entities.Voiture;
import com.example.gest.repository.VoitureRepository;

@Service
public class VoitureServiceImpl implements VoitureService {

    @Autowired
    private VoitureRepository voitureRepository;

    @Override
    public List<Voiture> getAllVoitures() {
        return voitureRepository.findAll();
    }

    @Override
    public Voiture getVoitureById(int immatriculation) {
        return voitureRepository.findById(immatriculation).orElse(null);
    }

    @Override
    public Voiture saveVoiture(Voiture voiture) {
        return voitureRepository.save(voiture);
    }

    @Override
    public Voiture updateVoiture(int immatriculation, Voiture voiture) {
        if (voitureRepository.existsById(immatriculation)) {
            voiture.setImmatriculation(immatriculation);
            return voitureRepository.save(voiture);
        } else {
            return null;
        }
    }

    @Override
    public void deleteVoiture(int immatriculation) {
        voitureRepository.deleteById(immatriculation);
    }
}
