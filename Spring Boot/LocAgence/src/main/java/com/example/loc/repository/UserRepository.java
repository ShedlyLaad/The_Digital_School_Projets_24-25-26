package com.example.loc.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.loc.entities.User;

public interface UserRepository extends JpaRepository<User, Long> {
}