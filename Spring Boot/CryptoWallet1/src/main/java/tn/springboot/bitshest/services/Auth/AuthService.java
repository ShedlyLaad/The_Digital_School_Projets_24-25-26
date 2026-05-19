package tn.springboot.bitshest.services.Auth;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import tn.springboot.bitshest.entity.Login;
import tn.springboot.bitshest.repository.LoginRepository;
import tn.springboot.bitshest.util.JwtUtil;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

@Service
public class AuthService {

    private final LoginRepository loginRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    @PersistenceContext
    private EntityManager entityManager;

    // Constructeur
    public AuthService(LoginRepository loginRepository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.loginRepository = loginRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    // Méthode d'inscription avec procédure stockée et hachage
    @Transactional
    public String register(String nom, String email, String password, String role) {
        // Hachage du mot de passe
        String hashedPassword = passwordEncoder.encode(password);

        // Appel de la procédure stockée
        entityManager.createNativeQuery("CALL LoginProcedure(:email, :nom, :role, :password)")
                .setParameter("email", email)
                .setParameter("nom", nom)
                .setParameter("role", role)
                .setParameter("password", hashedPassword) 
                .executeUpdate();

        return "Inscription réussie avec succès !";
    }

    // Méthode de connexion
    public String login(String email, String password) {
        Login login = loginRepository.findByEmail(email);

        if (login == null || !passwordEncoder.matches(password, login.getPassword())) {
            throw new RuntimeException("Email ou mot de passe incorrect !");
        }

        // Générer un token JWT
        return jwtUtil.generateToken(email, "USER"); // Remplacez "USER" par le rôle réel
    }
}
