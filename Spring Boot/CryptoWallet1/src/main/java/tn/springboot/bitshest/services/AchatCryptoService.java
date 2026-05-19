package tn.springboot.bitshest.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
public class AchatCryptoService {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    // valider
    public String acheterCrypto(Long clientId, Long cryptoMoneyId, Long detailCryptoMoneyId, BigDecimal montant) {
        try {
            jdbcTemplate.update(
                    "CALL AcheterCrypto(?, ?, ?, ?)",
                    clientId,
                    cryptoMoneyId,
                    detailCryptoMoneyId,
                    montant);
            return "Achat réussi !";
        } catch (Exception e) {
            return "Erreur lors de l'achat : " + e.getMessage();
        }
    }
}
