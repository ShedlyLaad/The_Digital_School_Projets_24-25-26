package tn.springboot.bitshest.entity;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "detailecryptomoney") // Correspondance avec la table SQL
public class Detailecryptomoney {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "cours_actuel", nullable = false, precision = 15, scale = 2) // champ 'cours_actuel'
    private BigDecimal coursActuel;

    @Column(name = "date_miseajour", columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime dateMiseAJour;

    @Column(name = "symbole", nullable = false, length = 10) // champ 'symbole'
    private String symbole;

    @Column(name = "variation24h", nullable = false, precision = 5, scale = 2) // champ 'variation24h'
    private BigDecimal variation24h;

    @ManyToOne
    @JoinColumn(name = "cryptomoney_id", nullable = false) // Foreign key
    private Cryptomoney cryptomoney;

    // Constructeurs
    public Detailecryptomoney() {
    }

    public Detailecryptomoney(BigDecimal coursActuel, LocalDateTime dateMiseAJour, String symbole,
            BigDecimal variation24h, Cryptomoney cryptomoney) {
        this.coursActuel = coursActuel;
        this.dateMiseAJour = dateMiseAJour;
        this.symbole = symbole;
        this.variation24h = variation24h;
        this.cryptomoney = cryptomoney;
    }

    // Getters et Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public BigDecimal getCoursActuel() {
        return coursActuel;
    }

    public void setCoursActuel(BigDecimal coursActuel) {
        this.coursActuel = coursActuel;
    }

    public LocalDateTime getDateMiseAJour() {
        return dateMiseAJour;
    }

    public void setDateMiseAJour(LocalDateTime dateMiseAJour) {
        this.dateMiseAJour = dateMiseAJour;
    }

    public String getSymbole() {
        return symbole;
    }

    public void setSymbole(String symbole) {
        this.symbole = symbole;
    }

    public BigDecimal getVariation24h() {
        return variation24h;
    }

    public void setVariation24h(BigDecimal variation24h) {
        this.variation24h = variation24h;
    }

    public Cryptomoney getCryptomoney() {
        return cryptomoney;
    }

    public void setCryptomoney(Cryptomoney cryptomoney) {
        this.cryptomoney = cryptomoney;
    }
}
