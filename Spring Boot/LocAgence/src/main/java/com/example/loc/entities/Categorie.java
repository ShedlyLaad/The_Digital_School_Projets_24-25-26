package com.example.loc.entities;

import java.io.Serializable;
import java.util.List;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class Categorie implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String nom;

    private String description;

	@OneToMany(mappedBy = "cat")
	private List<Vehicule> vehicules;

	public Categorie() {}

	public Categorie(String nom, String description) {
	    this.nom = nom;
	    this.description = description;
	}

	public int getId() {
	    return id;
	}

	public void setId(int id) {
	    this.id = id;
	}

	public String getNom() {
	    return nom;
	}

	public void setNom(String nom) {
	    this.nom = nom;
	}

	public String getDescription() {
	    return description;
	}

	public void setDescription(String description) {
	    this.description = description;
	}

	public List<Vehicule> getVehicules() {
	    return vehicules;
	}

	public void setVehicules(List<Vehicule> vehicules) {
	    this.vehicules = vehicules;
	}

	public static long getSerialversionuid() {
	    return serialVersionUID;
	}

	@Override
	public String toString() {
	    return "Categorie [id=" + id + ", nom=" + nom + ", description=" + description + "]";
	}
}
