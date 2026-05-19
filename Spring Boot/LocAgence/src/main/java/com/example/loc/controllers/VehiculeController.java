package com.example.loc.controllers;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.loc.entities.Vehicule;
import com.example.loc.service.VehiculeService;

@RestController
@RequestMapping("/vehicules")
public class VehiculeController {

    @Autowired
    private VehiculeService vehiculeService;

    @PostMapping
    public ResponseEntity<Vehicule> ajouterVehicule(@RequestBody Vehicule vehicule) {
        return ResponseEntity.ok(vehiculeService.ajouterVehicule(vehicule));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> supprimerVehicule(@PathVariable Long id) {
        vehiculeService.supprimerVehicule(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<List<Vehicule>> getAllVehicules() {
        return ResponseEntity.ok(vehiculeService.getAllVehicules());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Vehicule> updateVehicule(@PathVariable Long id, @RequestBody Vehicule vehicule) {
        Vehicule updatedVehicule = vehiculeService.updateVehicule(id, vehicule);
        return updatedVehicule != null ? ResponseEntity.ok(updatedVehicule) : ResponseEntity.notFound().build();
    }
}