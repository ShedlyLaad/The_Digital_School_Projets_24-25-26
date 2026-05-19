package tn.springboot.bitshest.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.springboot.bitshest.entity.Client;
import java.util.Optional;

@Repository
public interface ClientRepository extends JpaRepository<Client, Long> { // Changer Integer en Long

    // Méthode pour trouver un client par l'id du login
    Optional<Client> findByLogin_Id(Long loginId); // Utiliser la notation avec underscore
}
