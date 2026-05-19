package tn.springboot.bitshest.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.springboot.bitshest.entity.Transactions;

public interface TransactionRepository extends JpaRepository<Transactions, Integer> {
    // Recherche des transactions par client
    List<Transactions> findByClientId(Long clientId);
}
