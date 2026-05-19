package com.example.loc;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class StartupMessage implements CommandLineRunner {

    @Override
    public void run(String... args) throws Exception {
        String message = "L'application Agence Location 2024 est démarrée avec succès!!";
        int length = message.length();
        
        StringBuilder border = new StringBuilder();
        for (int i = 0; i < length + 4; i++) {
            border.append("*");
        }
        
        System.out.println(border);
        System.out.println("* " + message + " *");
        System.out.println(border);
    }
}