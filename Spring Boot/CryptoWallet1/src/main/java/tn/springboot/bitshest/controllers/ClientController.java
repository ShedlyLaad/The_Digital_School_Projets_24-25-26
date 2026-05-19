package tn.springboot.bitshest.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.springboot.bitshest.entity.Transactions;
import tn.springboot.bitshest.entity.dto.CryptoAchetable;
import tn.springboot.bitshest.services.ClientService;

import java.util.List;

@RestController
@RequestMapping("/api/clients")
public class ClientController {

    @Autowired
    private ClientService clientService;

    // Obtenir toutes les cryptomonnaies d'un client
    @GetMapping("/{clientId}/cryptos")
    public List<Transactions> getToutesLesCryptosParClient(@PathVariable Long clientId) {
        return clientService.getToutesLesCryptosParClient(clientId);
    }

    // Lister toutes les transactions d'achat et de vente par client
    @GetMapping("/{clientId}/transactions")
    public List<Transactions> listerTransactionsParClient(@PathVariable Long clientId) {
        return clientService.listerTransactionsParClient(clientId);
    }



    // valider
       @GetMapping("/{clientId}/cryptos/achetable")
    public ResponseEntity<List<CryptoAchetable>> listerCryptoAchetableParClient(@PathVariable Long clientId) {
        try {
            List<CryptoAchetable> cryptosAchetable = clientService.listerCryptoAchetableParClient(clientId);
            return ResponseEntity.ok(cryptosAchetable);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        
        }
    }
}
