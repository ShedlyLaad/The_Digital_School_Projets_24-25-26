package tn.springboot.bitshest;

import org.springframework.boot.Banner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationListener;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.boot.context.event.ApplicationFailedEvent;

@SpringBootApplication
public class BitshestApplication {

	public static void main(String[] args) {
		SpringApplication app = new SpringApplication(BitshestApplication.class);
		app.setBannerMode(Banner.Mode.OFF); // Optionnel : Désactive la bannière Spring Boot

		// Ajoute un listener pour détecter un succès
		app.addListeners((ApplicationListener<ApplicationReadyEvent>) event -> {
			System.out.println("🚀 L'application a démarré avec succès !");
		});

		// Ajoute un listener pour détecter un échec
		app.addListeners((ApplicationListener<ApplicationFailedEvent>) event -> {
			System.err.println("❌ Échec du démarrage de l'application !");
			Throwable cause = event.getException(); // Affiche la cause de l'échec
			cause.printStackTrace();
		});

		app.run(args); // Démarre l'application
	}
}
