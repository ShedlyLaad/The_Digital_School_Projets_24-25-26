package tn.springboot.bitshest.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.springboot.bitshest.entity.Administrateur;
import tn.springboot.bitshest.services.AdministrateurService;

import java.util.List;

@RestController
@RequestMapping("/bitchest/administrateurs")
public class AdministrateurController {

    @Autowired
    private AdministrateurService administrateurService;

    @PostMapping("/create")
    public ResponseEntity<Administrateur> createAdministrateur(@RequestBody Administrateur administrateur) {
        Administrateur createdAdministrateur = administrateurService.createAdministrateur(administrateur);
        return new ResponseEntity<>(createdAdministrateur, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Administrateur>> getAllAdministrateurs() {
        List<Administrateur> administrateurs = administrateurService.getAllAdministrateurs();
        return new ResponseEntity<>(administrateurs, HttpStatus.OK);
    }
}
