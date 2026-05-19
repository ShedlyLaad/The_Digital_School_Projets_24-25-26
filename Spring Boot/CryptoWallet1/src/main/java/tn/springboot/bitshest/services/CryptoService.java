package tn.springboot.bitshest.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;

@Service
public class CryptoService {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    // valider
    @Transactional
    public String vendreCrypto(Long clientId, Long cryptoMoneyId, Long detailCryptoMoneyId, BigDecimal quantite) {
        try {

            String sql = "{CALL VendreCrypto(?, ?, ?, ?)}";
            jdbcTemplate.update(sql, clientId, cryptoMoneyId, detailCryptoMoneyId, quantite);

            return "Vente réussie";

        } catch (Exception e) {
            // Gérer l'exception si la vente échoue
            throw new RuntimeException("Erreur lors de la vente de la cryptomonnaie: " + e.getMessage(), e);
        }
    }
}
