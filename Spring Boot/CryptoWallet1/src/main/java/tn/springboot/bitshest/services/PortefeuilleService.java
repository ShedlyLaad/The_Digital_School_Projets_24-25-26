package tn.springboot.bitshest.services;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import tn.springboot.bitshest.entity.Portefeuille;
import tn.springboot.bitshest.repository.PortefeuilleRepository;

@Service
public class PortefeuilleService {

    @Autowired
    private PortefeuilleRepository portefeuilleRepository;

    public Portefeuille getPortefeuilleByClientId(Long clientId) {
        System.out.println("Recherche du portefeuille pour le client ID : " + clientId);
        Portefeuille portefeuille = portefeuilleRepository.findByClient_Id(clientId);

        if (portefeuille != null) {
            System.out.println("Portefeuille récupéré : " + portefeuille); 
        } else {
            System.out.println("Aucun portefeuille trouvé pour le client ID : " + clientId);
        }

        return portefeuille;
    }
   
  

}
