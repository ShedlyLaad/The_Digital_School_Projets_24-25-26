package tn.springboot.bitshest.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.springboot.bitshest.services.AchatCryptoService;

import java.math.BigDecimal;

@RestController
@RequestMapping("/api/crypto")
public class AchatCryptoController {

    @Autowired
    private AchatCryptoService achatCryptoService;

    // valider
    @PostMapping("/acheter")
    public ResponseEntity<String> acheterCrypto(
            @RequestParam Long clientId,
            @RequestParam Long cryptoMoneyId,
            @RequestParam Long detailCryptoMoneyId,
            @RequestParam BigDecimal montant) {
        String result = achatCryptoService.acheterCrypto(clientId, cryptoMoneyId, detailCryptoMoneyId, montant);
        if (result.contains("Erreur")) {
            return ResponseEntity.badRequest().body(result);
        }
        return ResponseEntity.ok(result);
    }
}
