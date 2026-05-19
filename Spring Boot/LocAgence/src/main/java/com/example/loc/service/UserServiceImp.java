package com.example.loc.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.loc.entities.User;
import com.example.loc.repository.UserRepository;

@Service
public class UserServiceImp implements UserService {

    @Autowired
    private UserRepository userRep;

    @Override
    public User ajouterUser(User user) {
        return userRep.save(user);
    }

    @Override
    public void supprimerUser(Long id) {
        userRep.deleteById(id);
    }

    @Override
    public List<User> getAllUsers() {
        return userRep.findAll();
    }

    @Override
    public User updateUser(Long id, User user) {
        if (userRep.existsById(id)) {
            user.setId(id);
            return userRep.save(user);
        }
        return null;
    }
}