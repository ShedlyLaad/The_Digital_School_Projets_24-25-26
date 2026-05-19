package tn.springboot.bitshest.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.springboot.bitshest.entity.Login;


@Repository
public interface LoginRepository extends JpaRepository<Login, Long> {
    Login findByEmail(String email);
}
