package com.polytech.metiermicroservice.service;

import com.polytech.metiermicroservice.model.TacheRealisee;
import com.polytech.metiermicroservice.model.TacheRealiseePK;
import com.polytech.metiermicroservice.repository.*;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TacheRealiseeService {

  @Autowired
  TacheRealiseeRepository tacheRealiseeRepository;

  public List<Object[]> getTacheRealiseeParCollaborateur(
    Integer codeProjet,
    String codeCollab
  ) {
    return tacheRealiseeRepository.findByCollaborateur(codeProjet, codeCollab);
  }

  public List<Object[]> getTacheRealiseeParCollaborateurProjet(
    Integer codeProjet
  ) {
    return tacheRealiseeRepository.findByCollaborateurProjet(codeProjet);
  }

  public int countTacheRealisee(String status) {
    return tacheRealiseeRepository.countByStatus(status);
  }

  public int countTaskCollaborateur(
    String codeCollab,
    String status
  ) {
    return tacheRealiseeRepository.countTaskCollaborateur(
      codeCollab,
      status
    );
  }

  public void delete(TacheRealisee t) {
    tacheRealiseeRepository.delete(t);
  }

  public void deleteByPK(Integer codeTache,String codeCollab) {
	TacheRealiseePK pk = new TacheRealiseePK();
    pk.setCodeTache(codeTache);
    pk.setCodeCollab(codeCollab);

    tacheRealiseeRepository.deleteById(pk);
  }

}
