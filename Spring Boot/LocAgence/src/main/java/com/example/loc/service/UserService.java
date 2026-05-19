package com.example.loc.service;

import java.util.List;
import com.example.loc.entities.User;

public interface UserService {
    User ajouterUser(User user);
    void supprimerUser(Long id);
    List<User> getAllUsers();
    User updateUser(Long id, User user);
}