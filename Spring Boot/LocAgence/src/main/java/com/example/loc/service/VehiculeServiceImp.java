package com.example.loc.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.loc.entities.Vehicule;
import com.example.loc.repository.VehiculeRepository;

@Service
public class VehiculeServiceImp implements VehiculeService {
    @Autowired
    VehiculeRepository vehiculeRep;

    @Override
    public Vehicule ajouterVehicule(Vehicule v) {
        vehiculeRep.save(v);
        return v;
    }

    @Override
    public void supprimerVehicule(Vehicule v) {
        vehiculeRep.delete(v);
    }

    @Override
    public void supprimerVehicule(Long id) {
        vehiculeRep.deleteById(id);
    }

    @Override
    public List<Vehicule> getAllVehicules() {
        return (List<Vehicule>) vehiculeRep.findAll();
    }

    @Override
    public Vehicule updateVehicule(Long id, Vehicule vehicule) {
        if (vehiculeRep.existsById(id)) {
            vehicule.setSerie(id);
            return vehiculeRep.save(vehicule);
        }
        return null;
    }
}