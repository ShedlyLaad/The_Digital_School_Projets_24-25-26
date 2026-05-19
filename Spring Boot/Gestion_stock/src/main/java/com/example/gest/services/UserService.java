package com.example.gest.services;

import java.util.List;

import com.example.gest.entities.User;

public interface UserService {
    User AjouterUser(User u);
    void DeleteUser(User u);
    void DeleteUser(Long id);
    List<User> getAllUser();
    User updateUser(Long id, User user);
}
