package tn.springboot.bitshest.entity.dto;

public class CryptoAchetable {

    private Long cryptomoneyId;
    private String cryptomoneyNom;
    private Double prixUnitaire;
    private Long quantiteAchetable;

    // Getters and Setters

    public Long getCryptomoneyId() {
        return cryptomoneyId;
    }

    public void setCryptomoneyId(Long cryptomoneyId) {
        this.cryptomoneyId = cryptomoneyId;
    }

    public String getCryptomoneyNom() {
        return cryptomoneyNom;
    }

    public void setCryptomoneyNom(String cryptomoneyNom) {
        this.cryptomoneyNom = cryptomoneyNom;
    }

    public Double getPrixUnitaire() {
        return prixUnitaire;
    }

    public void setPrixUnitaire(Double prixUnitaire) {
        this.prixUnitaire = prixUnitaire;
    }

    public Long getQuantiteAchetable() {
        return quantiteAchetable;
    }

    public void setQuantiteAchetable(Long quantiteAchetable) {
        this.quantiteAchetable = quantiteAchetable;
    }
}
