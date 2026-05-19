package tn.springboot.bitshest.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import tn.springboot.bitshest.entity.LoginRequest;
import tn.springboot.bitshest.entity.RegisterRequest;
import tn.springboot.bitshest.services.Auth.AuthService;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    // valider
    // Inscription (Register)
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterRequest registerRequest) {
        try {
            String response = authService.register(
                    registerRequest.getNom(),
                    registerRequest.getEmail(),
                    registerRequest.getPassword(),
                    registerRequest.getRole());
            return new ResponseEntity<>(response, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    // valider
    // Connexion (Login)
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest loginRequest) {
        try {
            String jwtToken = authService.login(loginRequest.getEmail(), loginRequest.getPassword());
            return new ResponseEntity<>(jwtToken, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.UNAUTHORIZED);
        }
    }
}
