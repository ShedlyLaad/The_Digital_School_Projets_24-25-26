package com.example.gest.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.gest.entities.Voiture;

@Repository
public interface VoitureRepository extends JpaRepository<Voiture, Integer> {
    
}
