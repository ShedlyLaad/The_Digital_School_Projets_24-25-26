package com.example.gest.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.gest.entities.User;
import com.example.gest.services.UserService;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/add")
    public User addUser(@RequestBody User user) {
        return userService.AjouterUser(user);
    }

    @GetMapping("/all")
    public List<User> getAllUsers() {
        return userService.getAllUser();
    }

    @DeleteMapping("/delete/{id}")
    public String deleteUserById(@PathVariable Long id) {
        userService.DeleteUser(id);
        return "User with ID " + id + " has been deleted.";
    }

    @DeleteMapping("/delete")
    public String deleteUser(@RequestBody User user) {
        userService.DeleteUser(user);
        return "User has been deleted.";
    }

    @PutMapping("/update/{id}")
    public User updateUser(@PathVariable Long id, @RequestBody User user) {
        return userService.updateUser(id, user);
    }
}
