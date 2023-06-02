package com.polytech.metiermicroservice.model;

import jakarta.persistence.*;
import java.util.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;

@Entity
@Data
public class Projet {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int codeProjet;

  private String intituleProjet;
  private int chargeHoraireProjet;

  @JsonIgnore
  @OneToMany(mappedBy = "projet")
  private List<Tache> taches = new ArrayList<Tache>();
}
