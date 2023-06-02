package com.polytech.metiermicroservice.repository;

import com.polytech.metiermicroservice.model.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ProjetRepository extends JpaRepository<Projet, Integer> {
  @Query("SELECT COUNT(*) FROM Projet")
  int countProjets();
}
