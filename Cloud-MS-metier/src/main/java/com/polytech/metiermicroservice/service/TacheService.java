package com.polytech.metiermicroservice.service;

import com.polytech.metiermicroservice.model.Projet;
import com.polytech.metiermicroservice.model.Tache;
import com.polytech.metiermicroservice.repository.*;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TacheService {

  @Autowired
  TacheRepository tacheRepository;

  @Autowired
  CollaborateurRepository collaborateurRepository;

  @Autowired
  ProjetRepository projetRepository;

  public Tache save(Tache t) {
    return tacheRepository.save(t);
  }

  public Tache save2(
    Integer codeProjet,
    String intituleTache,
    Integer chargeHoraireTache
  ) {
    Optional<Projet> projet = projetRepository.findById(codeProjet);
    if (projet.isPresent()) {
      Tache t = new Tache();
      t.setIntituleTache(intituleTache);
      t.setChargeHoraireTache(chargeHoraireTache);
      tacheRepository.save(t);

      Projet p = projet.get();
      t.setProjet(p);

      return tacheRepository.save(t);
    } else {
      return null;
    }
  }

  public Tache update(
    Integer codeTache,
    Integer codeProjet,
    String intituleTache,
    Integer chargeHoraireTache
  ) {
    Optional<Projet> projet = projetRepository.findById(codeProjet);
    Optional<Tache> tache = tacheRepository.findById(codeTache);
    if (projet.isPresent() && tache.isPresent()) {
      Tache t = tache.get();
      t.setIntituleTache(intituleTache);
      t.setChargeHoraireTache(chargeHoraireTache);
      tacheRepository.save(t);

      Projet p = projet.get();
      t.setProjet(p);
      System.out.println("Success");
      return tacheRepository.save(t);
    } else {
      return null;
    }
  }

  public List<Tache> findByProjetCodeProjet(Integer codeProjet) {
    return tacheRepository.findByProjetCodeProjet(codeProjet);
  }

  public Tache update(Tache t) {
    return tacheRepository.save(t);
  }

  public void delete(Tache t) {
    tacheRepository.delete(t);
  }

  public void deleteById(Integer codeTache) {
    tacheRepository.deleteById(codeTache);
  }

  public Tache findByCodeTache(Integer codeTache) {
    return tacheRepository.findById(codeTache).get();
  }

  public List<Tache> findAllTaches() {
    return tacheRepository.findAll();
  }
}
