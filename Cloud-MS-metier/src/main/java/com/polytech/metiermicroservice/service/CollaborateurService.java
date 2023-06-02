package com.polytech.metiermicroservice.service;

import com.polytech.metiermicroservice.model.Admin;
import com.polytech.metiermicroservice.model.Collaborateur;
import com.polytech.metiermicroservice.model.Manager;
import com.polytech.metiermicroservice.repository.*;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CollaborateurService {

  @Autowired
  CollaborateurRepository collaborateurRepository;

  public Collaborateur save(Collaborateur c) {
    return collaborateurRepository.save(c);
  }

  public Manager saveManager(Manager m) {
    return collaborateurRepository.save(m);
  }

  public Admin saveAdmin(Admin a) {
    return collaborateurRepository.save(a);
  }

  public Collaborateur update(Collaborateur c) {
    return collaborateurRepository.save(c);
  }

  public Manager updateManager(Manager m) {
    return collaborateurRepository.save(m);
  }

  public Admin updateAdmin(Admin a) {
    return collaborateurRepository.save(a);
  }

  public void delete(Collaborateur c) {
    collaborateurRepository.delete(c);
  }

  public void deleteById(String codeCollab) {
    collaborateurRepository.deleteById(codeCollab);
  }

  public Collaborateur findById(String codeCollab) {
    return collaborateurRepository.findById(codeCollab).get();
  }

  public List<Collaborateur> findAllCollaborateurs() {
    return collaborateurRepository.findAll();
  }

  public void deleteByCodeCollab(String codeCollab) {
    Collaborateur collaborateur = collaborateurRepository.findByCodeCollab(
      codeCollab
    );
    collaborateurRepository.deleteById(codeCollab);
    collaborateurRepository.delete(collaborateur);
  }

  public Object getProfilCollaborateur(String codeCollab, String motPasse) {
    return collaborateurRepository.getProfilCollaborateur(codeCollab, motPasse);
  }

  public List<Object[]> getAllCollaborateurs(){
    return collaborateurRepository.getAllCollaborateurs();
  }

  public List<Object[]> getOnlyManagers(){
    return collaborateurRepository.getOnlyManagers();
  }

  public int countCollaborateurs() {
    return collaborateurRepository.countCollaborateurs();
}

}
