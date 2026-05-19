package com.example.gest.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.gest.entities.User;
import com.example.gest.repository.UserRepository;

@Service
public class UserServiceImp implements UserService {
    @Autowired
    UserRepository userRep;

    @Override
    public User AjouterUser(User u) {
        userRep.save(u);
        return u;
    }

    @Override
    public void DeleteUser(User u) {
        userRep.delete(u);
    }

    @Override
    public void DeleteUser(Long id) {
        userRep.deleteById(id);
    }

    @Override
    public List<User> getAllUser() {
        return (List<User>) userRep.findAll();
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
