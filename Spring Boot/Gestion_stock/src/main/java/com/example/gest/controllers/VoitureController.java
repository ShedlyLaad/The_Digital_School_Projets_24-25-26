package com.example.gest.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.gest.entities.Voiture;
import com.example.gest.services.VoitureService;

@RestController
@RequestMapping("/voitures")
public class VoitureController {

    @Autowired
    private VoitureService voitureService;

    @GetMapping
    public List<Voiture> getAllVoitures() {
        return voitureService.getAllVoitures();
    }

    @GetMapping("/{id}")
    public Voiture getVoitureById(@PathVariable int id) {
        return voitureService.getVoitureById(id);
    }

    @PostMapping("/add")
    public Voiture saveVoiture(@RequestBody Voiture voiture) {
        return voitureService.saveVoiture(voiture);
    }

    @PutMapping("/update/{id}")
    public Voiture updateVoiture(@PathVariable int id, @RequestBody Voiture voiture) {
        return voitureService.updateVoiture(id, voiture);
    }

    @DeleteMapping("/{id}")
    public void deleteVoiture(@PathVariable int id) {
        voitureService.deleteVoiture(id);
    }
}
