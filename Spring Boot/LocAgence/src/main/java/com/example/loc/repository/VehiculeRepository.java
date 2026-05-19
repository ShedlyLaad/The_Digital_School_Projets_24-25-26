package com.example.loc.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.loc.entities.Vehicule;

public interface VehiculeRepository extends JpaRepository<Vehicule, Long> {
}