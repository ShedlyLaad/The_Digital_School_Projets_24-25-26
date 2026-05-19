package com.example.loc.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.loc.entities.Categorie;
import com.example.loc.repository.CategorieRepository;

@Service
public class CategorieServiceImp implements CategorieService {
    @Autowired
    CategorieRepository categorieRep;

    @Override
    public Categorie ajouterCategorie(Categorie c) {
        categorieRep.save(c);
        return c;
    }

    @Override
    public void supprimerCategorie(Categorie c) {
        categorieRep.delete(c);
    }

    @Override
    public void supprimerCategorie(int id) {
        categorieRep.deleteById(id);
    }

    @Override
    public List<Categorie> getAllCategories() {
        return (List<Categorie>) categorieRep.findAll();
    }

    @Override
    public Categorie updateCategorie(int id, Categorie categorie) {
        if (categorieRep.existsById(id)) {
            categorie.setId(id);
            return categorieRep.save(categorie);
        }
        return null;
    }
}