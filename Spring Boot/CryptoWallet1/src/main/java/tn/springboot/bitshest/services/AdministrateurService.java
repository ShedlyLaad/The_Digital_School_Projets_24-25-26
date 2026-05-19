package tn.springboot.bitshest.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.springboot.bitshest.entity.Administrateur;
import tn.springboot.bitshest.repository.AdministrateurRepository;

import java.util.List;

@Service
public class AdministrateurService {

    @Autowired
    private AdministrateurRepository administrateurRepository;

    public Administrateur createAdministrateur(Administrateur administrateur) {
        return administrateurRepository.save(administrateur);
    }

    public List<Administrateur> getAllAdministrateurs() {
        return administrateurRepository.findAll();
    }
}
