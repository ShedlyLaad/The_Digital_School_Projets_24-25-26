package com.example.loc.entities;

import java.io.Serializable;
import java.time.LocalDate;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.FetchType;

@Entity
public class Vehicule implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long serie;
    private String nom;
    private String marque;
    private LocalDate dateCircu;
    private float prixJ;
    private boolean dispo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cat_id")
    private Categorie cat;

    @OneToOne(mappedBy = "vehicule")
    private Reservation reservation;

    public Vehicule() {}

    public Vehicule(String nom, String marque, LocalDate dateCircu, float prixJ, boolean dispo, Categorie cat) {
        this.nom = nom;
        this.marque = marque;
        this.dateCircu = dateCircu;
        this.prixJ = prixJ;
        this.dispo = dispo;
        this.cat = cat;
    }

    public Long getSerie() {
        return serie;
    }

    public void setSerie(Long serie) {
        this.serie = serie;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getMarque() {
        return marque;
    }

    public void setMarque(String marque) {
        this.marque = marque;
    }

    public LocalDate getDateCircu() {
        return dateCircu;
    }

    public void setDateCircu(LocalDate dateCircu) {
        this.dateCircu = dateCircu;
    }

    public float getPrixJ() {
        return prixJ;
    }

    public void setPrixJ(float prixJ) {
        this.prixJ = prixJ;
    }

    public boolean isDispo() {
        return dispo;
    }

    public void setDispo(boolean dispo) {
        this.dispo = dispo;
    }

    public Categorie getCat() {
        return cat;
    }

    public void setCat(Categorie cat) {
        this.cat = cat;
    }

    public Reservation getReservation() {
        return reservation;
    }

    public void setReservation(Reservation reservation) {
        this.reservation = reservation;
    }

	@Override
	public String toString() {
		return "Vehicule [serie=" + serie + ", nom=" + nom + ", marque=" + marque + ", dateCircu=" + dateCircu
				+ ", prixJ=" + prixJ + ", dispo=" + dispo + ", cat=" + (cat != null ? cat.getNom() : "null")
                + ", reservation=" + (reservation != null ? "exists" : "none") + "]";
	}
}
