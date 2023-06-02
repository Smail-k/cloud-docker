package com.polytech.metiermicroservice.controller;

import com.polytech.metiermicroservice.model.*;
import com.polytech.metiermicroservice.service.ProjetService;
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
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/projet")
@CrossOrigin(origins = "*")
public class ProjetController {

  @Autowired
  ProjetService projetService;

  @GetMapping(value = "/all")
  public List<Projet> all() {
    return projetService.findAllProjects();
  }

  @GetMapping(value = "/{codeProjet}")
  public Projet getProjet(@PathVariable(name = "codeProjet") int codeProjet) {
    return projetService.findByCodeProjet(codeProjet);
  }

  @PostMapping(value = "/new")
  public Projet newProjet(@RequestBody Projet projet) {
    return projetService.save(projet);
  }

  @PutMapping(value = "/update")
  public Projet updateProjet(@RequestBody Projet projet) {
    return projetService.update(projet);
  }

  @DeleteMapping(value = "/delete")
  public void delete(@RequestBody Projet projet) {
    projetService.delete(projet);
  }

  @DeleteMapping(value = "/delete/{codeProjet}")
  public void deleteProjet(@PathVariable(name = "codeProjet") int codeProjet) {
    projetService.deleteById(codeProjet);
  }

  @GetMapping("/count")
  public int countProjets() {
      return projetService.countProjets();
  }

}
