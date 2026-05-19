package tn.springboot.bitshest.entity;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "transactions") // Correspondance avec la table SQL
public class Transactions {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "type_transaction", nullable = false) // Enum 'achat' ou 'vente'
    private String typeTransaction;

    @Column(name = "prix_transaction", nullable = false, precision = 15, scale = 2) // Champ 'prix_transaction'
    private BigDecimal prixTransaction;

    @Column(name = "quantite", nullable = false, precision = 15, scale = 4) // Champ 'quantite'
    private BigDecimal quantite;

    @Column(name = "date_transaction", columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime dateTransaction;

    // Relations
    @ManyToOne
    @JoinColumn(name = "client_id", nullable = false) // Clé étrangère vers 'client'
    private Client client;

    @ManyToOne
    @JoinColumn(name = "detailecryptomoney_id", nullable = false) // Clé étrangère vers 'detailecryptomoney'
    private Detailecryptomoney detailecryptomoney;

    @ManyToOne
    @JoinColumn(name = "cryptomoney_id", nullable = false) // Clé étrangère vers 'cryptomoney'
    private Cryptomoney cryptomoney;

    // Constructeurs
    public Transactions() {
    }

    public Transactions(String typeTransaction, BigDecimal prixTransaction, BigDecimal quantite,
            LocalDateTime dateTransaction, Client client, Detailecryptomoney detailecryptomoney,
            Cryptomoney cryptomoney) {
        this.typeTransaction = typeTransaction;
        this.prixTransaction = prixTransaction;
        this.quantite = quantite;
        this.dateTransaction = dateTransaction;
        this.client = client;
        this.detailecryptomoney = detailecryptomoney;
        this.cryptomoney = cryptomoney;
    }

    // Getters et Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTypeTransaction() {
        return typeTransaction;
    }

    public void setTypeTransaction(String typeTransaction) {
        this.typeTransaction = typeTransaction;
    }

    public BigDecimal getPrixTransaction() {
        return prixTransaction;
    }

    public void setPrixTransaction(BigDecimal prixTransaction) {
        this.prixTransaction = prixTransaction;
    }

    public BigDecimal getQuantite() {
        return quantite;
    }

    public void setQuantite(BigDecimal quantite) {
        this.quantite = quantite;
    }

    public LocalDateTime getDateTransaction() {
        return dateTransaction;
    }

    public void setDateTransaction(LocalDateTime dateTransaction) {
        this.dateTransaction = dateTransaction;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public Detailecryptomoney getDetailecryptomoney() {
        return detailecryptomoney;
    }

    public void setDetailecryptomoney(Detailecryptomoney detailecryptomoney) {
        this.detailecryptomoney = detailecryptomoney;
    }

    public Cryptomoney getCryptomoney() {
        return cryptomoney;
    }

    public void setCryptomoney(Cryptomoney cryptomoney) {
        this.cryptomoney = cryptomoney;
    }
}
