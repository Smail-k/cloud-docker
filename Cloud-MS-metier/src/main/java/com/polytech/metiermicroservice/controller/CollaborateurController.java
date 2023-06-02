package  com.polytech.metiermicroservice.controller;

import com.polytech.metiermicroservice.model.*;
import com.polytech.metiermicroservice.service.CollaborateurService;
import com.polytech.metiermicroservice.service.ManagerService;
import com.polytech.metiermicroservice.service.TacheRealiseeService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/collaborateur")
@CrossOrigin(origins = "*")
public class CollaborateurController {

  @Autowired
  CollaborateurService collaborateurService;

  @Autowired
  ManagerService managerService;

  @GetMapping(value = "/all")
  public List<Collaborateur> all() {
    return collaborateurService.findAllCollaborateurs();
  }

  @GetMapping(value = "/only")
  public List<Object[]> allCollaborateurs() {
    return collaborateurService.getAllCollaborateurs();
  }

  @GetMapping(value = "/only-manager")
  public List<Object[]> getOnlyManagers() {
    return collaborateurService.getOnlyManagers();
  }

  @PostMapping(value = "/getByCodeAndMotPass")
  public Object getCollaborateurByCodeAndPass(
    @RequestParam("codeCollab") String codeCollab,
    @RequestParam("motPasse") String motPasse
  ) {

    System.out.println(codeCollab + "---" + motPasse);
    return collaborateurService.getProfilCollaborateur(codeCollab, motPasse);
  }

  @GetMapping(value = "/{codecollaborateur}")
  public Collaborateur getcollaborateur(
    @PathVariable(name = "codecollab") String codecollab
  ) {
    return collaborateurService.findById(codecollab);
  }

  @PostMapping(value = "/new")
  public Collaborateur newcollaborateur(
    @RequestBody Collaborateur collaborateur
  ) {
    return collaborateurService.save(collaborateur);
  }

  @PostMapping(value = "/newManager")
  public Manager newManager(@RequestBody Manager manager) {
    return collaborateurService.saveManager(manager);
  }

  @PostMapping(value = "/newAdmin")
  public Admin newAdmin(@RequestBody Admin admin) {
    return collaborateurService.saveAdmin(admin);
  }

  @PostMapping(value = "/affectTacheCollaborateur")
  public TacheRealisee affectTacheCollaborateur(
    @RequestParam("codeTache") Integer codeTache,
    @RequestParam("codeCollab") String codeCollab,
    @RequestParam("chargeHorairePlanifiee") String chargeHorairePlanifiee
  ) {
    return managerService.affectTacheCollaborateur(
      codeTache,
      codeCollab,
      chargeHorairePlanifiee
    );
  }

  @PostMapping(value = "/validerTache")
  public TacheRealisee validerTache(
    @RequestParam("codeTache") Integer codeTache,
    @RequestParam("codeCollab") String codeCollab
  ) {
    return managerService.valider(codeTache, codeCollab);
  }

  @PostMapping(value = "/doneTask")
  public TacheRealisee doneTask(
    @RequestParam("codeTache") Integer codeTache,
    @RequestParam("codeCollab") String codeCollab,
    @RequestParam("chargeHoraireRealisee") Integer chargeHoraireRealisee
  ) {
    return managerService.doneTask(codeTache, codeCollab,chargeHoraireRealisee);
  }

  @PutMapping(value = "/update")
  public Collaborateur updatecollaborateur(
    @RequestBody Collaborateur collaborateur
  ) {
    return collaborateurService.update(collaborateur);
  }

  @PutMapping(value = "/updateManager")
  public Manager updateManager(@RequestBody Manager manager) {
    return collaborateurService.updateManager(manager);
  }

  @PutMapping(value = "/updateAdmin")
  public Admin updateAdmin(@RequestBody Admin admin) {
    return collaborateurService.updateAdmin(admin);
  }

  @DeleteMapping(value = "/delete/{codecollab}")
  public void deletecollaborateur(
    @PathVariable(name = "codecollab") String codecollab
  ) {
    collaborateurService.deleteByCodeCollab(codecollab);
  }
  @GetMapping("/count")
  public int countCollaborateurs() {
      return collaborateurService.countCollaborateurs();
  }
}
