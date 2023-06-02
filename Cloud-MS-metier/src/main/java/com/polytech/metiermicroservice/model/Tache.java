package com.polytech.metiermicroservice.model;

import java.util.*;
import jakarta.persistence.*;
import lombok.Data;


@Entity
@Data
public class Tache {
	@Id 
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int codeTache;
	private String intituleTache;
	private int chargeHoraireTache;
	//codeProjet
	@ManyToOne
	private Projet projet;
	
	@ManyToMany
	@JoinTable( 
			name="TacheRealisee", //classe JPA between Personne and Tache
			joinColumns={@JoinColumn(name="codeTache")},
			inverseJoinColumns= {@JoinColumn(name="codeCollab")}		
	)
	
	private Set<Collaborateur> collaborateurs= new HashSet<Collaborateur>();

}
