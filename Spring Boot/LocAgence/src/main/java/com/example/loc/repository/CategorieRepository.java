package com.example.loc.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.loc.entities.Categorie;

public interface CategorieRepository extends JpaRepository<Categorie, Integer> {
}