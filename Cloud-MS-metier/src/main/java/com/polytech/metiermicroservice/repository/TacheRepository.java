package com.polytech.metiermicroservice.repository;

import java.util.List;

import org.springframework.data.jpa.repository.*;
import com.polytech.metiermicroservice.model.*;

public interface TacheRepository extends JpaRepository<Tache,Integer> {

    List<Tache> findByProjetCodeProjet(Integer codeProjet);
}
