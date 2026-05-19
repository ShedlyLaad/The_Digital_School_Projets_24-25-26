package com.example.loc.service;

import java.util.List;
import com.example.loc.entities.Categorie;

public interface CategorieService {
    Categorie ajouterCategorie(Categorie c);
    void supprimerCategorie(Categorie c);
    void supprimerCategorie(int id);
    List<Categorie> getAllCategories();
    Categorie updateCategorie(int id, Categorie categorie);
}