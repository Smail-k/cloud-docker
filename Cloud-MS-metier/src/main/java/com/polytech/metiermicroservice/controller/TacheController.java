package com.polytech.metiermicroservice.controller;

import com.polytech.metiermicroservice.model.Tache;
import com.polytech.metiermicroservice.model.TacheRealisee;
import com.polytech.metiermicroservice.repository.TacheRepository;
import com.polytech.metiermicroservice.service.TacheRealiseeService;
import com.polytech.metiermicroservice.service.TacheService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/tache")
@CrossOrigin(origins = "*")
public class TacheController {

  @Autowired
  TacheService tacheService;

  @Autowired
  TacheRealiseeService tacheRealiseeService;

  @Autowired
  TacheRepository tacheRepository;

  @GetMapping(value = "/all")
  public List<Tache> getToutesTaches() {
    return tacheRepository.findAll();
  }

  @GetMapping(value = "/{id}")
  public Tache getTache(@PathVariable(name = "id") int id) {
    return tacheService.findByCodeTache(id);
  }

  @PostMapping(value = "/new")
  public Tache newTache(@RequestBody Tache tache) {
    return tacheService.save(tache);
  }

  @PostMapping(value = "/new-save")
  public Tache newSaveTache(
    @RequestParam("codeProjet") Integer codeTache,
    @RequestParam("intituleTache") String intituleTache,
    @RequestParam("chargeHoraireTache") Integer chargeHoraireTache
  ) {
    return tacheService.save2(codeTache, intituleTache, chargeHoraireTache);
  }

  @PostMapping(value = "/update-new")
  public Tache updateNewTache(
    @RequestParam("codeTache") Integer codeTache,
    @RequestParam("codeProjet") Integer codeProjet,
    @RequestParam("intituleTache") String intituleTache,
    @RequestParam("chargeHoraireTache") Integer chargeHoraireTache
  ) {
    return tacheService.update(codeTache,codeProjet, intituleTache, chargeHoraireTache);
  }

  @PutMapping(value = "/update")
  public Tache updateTache(@RequestBody Tache tache) {
    return tacheService.update(tache);
  }

  @DeleteMapping(value = "/delete/{id}")
  public void deleteTache(@PathVariable(name = "id") int id) {
    tacheService.deleteById(id);
  }

  @GetMapping("/projet/{codeProjet}")
  public List<Tache> getTacheByProjetCodeProjet(
    @PathVariable("codeProjet") Integer codeProjet
  ) {
    return tacheService.findByProjetCodeProjet(codeProjet);
  }

  @GetMapping("/tache-rea")
  public List<Object[]> getTacheRealiseeParCollaborateur(
    @RequestParam("codeProjet") Integer codeProjet,
    @RequestParam("codeCollab") String codeCollab
  ) {
    return tacheRealiseeService.getTacheRealiseeParCollaborateur(codeProjet,codeCollab);
  }


  @GetMapping("/tache-rea-projet/{codeProjet}")
  public List<Object[]> getTacheRealiseeParCollaborateurProjet(
    @PathVariable Integer codeProjet
  ) {
    return tacheRealiseeService.getTacheRealiseeParCollaborateurProjet(codeProjet);
  }

}
