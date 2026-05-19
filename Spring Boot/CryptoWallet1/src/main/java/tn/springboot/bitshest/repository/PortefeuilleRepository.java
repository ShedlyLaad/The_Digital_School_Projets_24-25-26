package tn.springboot.bitshest.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.springboot.bitshest.entity.Portefeuille;

public interface PortefeuilleRepository extends JpaRepository<Portefeuille, Long> {
    // Recherche par client
    Portefeuille findByClient_Id(Long clientId);
}
