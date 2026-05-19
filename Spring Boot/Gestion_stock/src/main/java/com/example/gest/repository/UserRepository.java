package com.example.gest.repository;

import org.springframework.data.repository.CrudRepository;

import com.example.gest.entities.User;

public interface UserRepository extends CrudRepository<User, Long>{

}
