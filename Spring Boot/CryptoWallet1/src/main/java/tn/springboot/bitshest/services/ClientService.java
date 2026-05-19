package tn.springboot.bitshest.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import tn.springboot.bitshest.entity.Transactions;
import tn.springboot.bitshest.entity.dto.CryptoAchetable;
import tn.springboot.bitshest.repository.ClientRepository;
import tn.springboot.bitshest.repository.PortefeuilleRepository;
import tn.springboot.bitshest.repository.TransactionRepository;

import java.util.List;

@Service
public class ClientService {



        @Autowired
    private TransactionRepository transactionsRepository;

   
      @Autowired
    private JdbcTemplate jdbcTemplate;

    // valider
    public List<CryptoAchetable> listerCryptoAchetableParClient(Long clientId) {
        String sql = "CALL ListerCryptoAchetableParClient(?)";

        return jdbcTemplate.query(sql, new Object[] { clientId }, new BeanPropertyRowMapper<>(CryptoAchetable.class));
        
    }

        // Obtenir toutes les cryptomonnaies d'un client
    public List<Transactions> getToutesLesCryptosParClient(Long clientId) {
        return transactionsRepository.findByClientId(clientId);
    }

    // Lister toutes les transactions d'achat et de vente par client
    public List<Transactions> listerTransactionsParClient(Long clientId) {
        return transactionsRepository.findByClientId(clientId);
        
    }
}
