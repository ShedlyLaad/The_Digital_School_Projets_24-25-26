package tn.springboot.bitshest.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.springboot.bitshest.entity.Cryptomoney;

public interface CryptoMonnaieRepository extends JpaRepository<Cryptomoney, Long> {
}
