package com.example.loc.entities;

import java.io.Serializable;
import java.time.LocalDateTime;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.EntityListeners;

import com.example.loc.listeners.ReservationListener;

@Entity
@EntityListeners(ReservationListener.class)
public class Reservation implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime dateDebut;
    private LocalDateTime dateFin;
    private float prixT;
    private String cmntr;

    @OneToOne
    @JoinColumn(name = "vehicule_id")
    private Vehicule vehicule;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    public Reservation() {}

    public Reservation(LocalDateTime dateDebut, LocalDateTime dateFin, Vehicule vehicule, User user) {
        this.dateDebut = dateDebut;
        this.dateFin = dateFin;
        this.vehicule = vehicule;
        this.user = user;
     
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDateTime getDateDebut() {
        return dateDebut;
    }

    public void setDateDebut(LocalDateTime dateDebut) {
        this.dateDebut = dateDebut;
    }

    public LocalDateTime getDateFin() {
        return dateFin;
    }

    public void setDateFin(LocalDateTime dateFin) {
        this.dateFin = dateFin;
    }

    public float getPrixT() {
        return prixT;
    }

	public void setPrixT(float prixT) {
		this.prixT = prixT;
	}

	public String getCmntr() {
		return cmntr;
	}

	public void setCmntr(String cmntr) {
		this.cmntr = cmntr;
	}

	public Vehicule getVehicule() {
		return vehicule;
	}

	public void setVehicule(Vehicule vehicule) {
		this.vehicule = vehicule;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}
	
	@Override
	public String toString() {
	    return "Reservation [id=" + id + ", dateDebut=" + dateDebut + ", dateFin=" + dateFin + ", prixT=" + prixT
				+ ", cmntr=" + cmntr + "]";
	}
}
