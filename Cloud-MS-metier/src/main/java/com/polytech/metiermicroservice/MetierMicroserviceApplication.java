package com.polytech.metiermicroservice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;

import com.polytech.metiermicroservice.model.Admin;
import com.polytech.metiermicroservice.model.Collaborateur;
import com.polytech.metiermicroservice.model.Manager;
import com.polytech.metiermicroservice.model.Projet;
import com.polytech.metiermicroservice.model.Tache;
import com.polytech.metiermicroservice.model.TacheRealisee;
import com.polytech.metiermicroservice.model.TacheRealiseePK;

@SpringBootApplication
public class MetierMicroserviceApplication implements CommandLineRunner {

	@Autowired
  	private RepositoryRestConfiguration repositoryRestConfiguration;

	public static void main(String[] args) {
		SpringApplication.run(MetierMicroserviceApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		repositoryRestConfiguration.exposeIdsFor(Admin.class, Collaborateur.class, Manager.class, Projet.class, Tache.class, TacheRealisee.class, TacheRealiseePK.class);
	}
}
