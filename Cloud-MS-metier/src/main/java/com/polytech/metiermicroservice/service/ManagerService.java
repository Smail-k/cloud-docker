package com.polytech.metiermicroservice.service;

import com.polytech.metiermicroservice.model.Collaborateur;
import com.polytech.metiermicroservice.model.Tache;
import com.polytech.metiermicroservice.model.TacheRealisee;
import com.polytech.metiermicroservice.model.TacheRealiseePK;
import com.polytech.metiermicroservice.repository.*;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

@Service
public class ManagerService {

  @Autowired
  TacheRepository tacheRepository;

  @Autowired
  TacheRealiseeRepository tacheRealiseeRepository;

  @Autowired
  CollaborateurRepository collaborateurRepository;

  public TacheRealisee valider(Integer codeTache,String codeCollab) {
    TacheRealiseePK pk = new TacheRealiseePK();
    pk.setCodeTache(codeTache);
    pk.setCodeCollab(codeCollab);

    Optional<TacheRealisee> tacheRea = tacheRealiseeRepository.findById(pk);
    //&& tacheRea.get().getStatus().equals("done")
    if(tacheRea.isPresent()){
      TacheRealisee t = tacheRea.get();
      t.setStatus("Validated");
      return tacheRealiseeRepository.save(t);
    }else{
      return null;
    }

  }

  public TacheRealisee doneTask(Integer codeTache,String codeCollab, Integer chargeHoraireRealisee) {
    TacheRealiseePK pk = new TacheRealiseePK();
    pk.setCodeTache(codeTache);
    pk.setCodeCollab(codeCollab);

    Optional<TacheRealisee> tacheRea = tacheRealiseeRepository.findById(pk);
    if(tacheRea.isPresent()){
      TacheRealisee t = tacheRea.get();
      t.setStatus("Done");
      t.setChargeHoraireRealisee(chargeHoraireRealisee);
      return tacheRealiseeRepository.save(t);
    }else{
      return null;
    }

  }

  public void affecterTache() {}

  public TacheRealisee affectTacheCollaborateur(
    Integer codeTache,
    String codeCollab,
    String chargeHorairePlanifiee
  ) {
    //Recherche du collaborateur s'il existe
    Optional<Collaborateur> collab = collaborateurRepository.findById(
      codeCollab
    );
    Optional<Tache> t = tacheRepository.findById(codeTache);

    if (collab.isPresent() && t.isPresent()) {
      //Collaborateur et Tache existent dejà

      TacheRealisee tacheRea = new TacheRealisee();
      TacheRealiseePK pk = new TacheRealiseePK();

      pk.setCodeTache(t.get().getCodeTache());
      pk.setCodeCollab(collab.get().getCodeCollab());

      tacheRea.setTacheRealiseePK(pk);
      tacheRea.setStatus("todo");
      tacheRea.setChargeHoraireRealisee(0);
      tacheRea.setChargeHorairePlanifiee(Integer.parseInt(chargeHorairePlanifiee));
      return tacheRealiseeRepository.save(tacheRea);
    } else {
      return null;
    }
  }
}
