package com.example.loc.controllers;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.loc.entities.Categorie;
import com.example.loc.service.CategorieService;

@RestController
@RequestMapping("/categories")
public class CategorieController {

    @Autowired
    private CategorieService categorieService;

    @PostMapping
    public ResponseEntity<Categorie> ajouterCategorie(@RequestBody Categorie categorie) {
        return ResponseEntity.ok(categorieService.ajouterCategorie(categorie));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> supprimerCategorie(@PathVariable int id) {
        categorieService.supprimerCategorie(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<List<Categorie>> getAllCategories() {
        return ResponseEntity.ok(categorieService.getAllCategories());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Categorie> updateCategorie(@PathVariable int id, @RequestBody Categorie categorie) {
        Categorie updatedCategorie = categorieService.updateCategorie(id, categorie);
        return updatedCategorie != null ? ResponseEntity.ok(updatedCategorie) : ResponseEntity.notFound().build();
    }
}