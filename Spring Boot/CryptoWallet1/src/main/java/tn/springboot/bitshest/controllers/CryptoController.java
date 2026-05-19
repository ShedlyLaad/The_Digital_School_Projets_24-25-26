package tn.springboot.bitshest.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import tn.springboot.bitshest.services.CryptoService;

import java.math.BigDecimal;

@RestController
@RequestMapping("/api/crypto")
public class CryptoController {

    @Autowired
    private CryptoService cryptoService;

    // valider
    @PostMapping("/vendre")
    public ResponseEntity<String> vendreCrypto(
            @RequestParam Long clientId,
            @RequestParam Long cryptoMoneyId,
            @RequestParam Long detailCryptoMoneyId,
            @RequestParam BigDecimal quantite) {

        try {
            String result = cryptoService.vendreCrypto(clientId, cryptoMoneyId, detailCryptoMoneyId, quantite);
            return ResponseEntity.ok(result);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body("Erreur: " + e.getMessage());
        }
    }
}
