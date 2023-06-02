package com.polytech.metiermicroservice.controller;

import com.polytech.metiermicroservice.model.TacheRealisee;
import com.polytech.metiermicroservice.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/tacherealisee")
@CrossOrigin(origins = "*")
public class TacheRealiseeControlleur {

  @Autowired
  TacheRealiseeService tacheRealiseeService;

  @GetMapping("/count")
  public int countTaskRealisee(@RequestParam("status") String status) {
    return tacheRealiseeService.countTacheRealisee(status);
  }

  @GetMapping(value = "/countTask")
  public int countTaskByStatus(
    @RequestParam("codeCollab") String codeCollab,
    @RequestParam("status") String status
  ) {
    return tacheRealiseeService.countTaskCollaborateur(codeCollab, status);
  }

  @DeleteMapping(value = "/delete")
  public void delete(@RequestBody TacheRealisee tacheRealisee) {
    tacheRealiseeService.delete(tacheRealisee);
  }

  @DeleteMapping(value = "/delete-pk")
  public void doneTask(
    @RequestParam("codeTache") Integer codeTache,
    @RequestParam("codeCollab") String codeCollab
  ) {
    tacheRealiseeService.deleteByPK(codeTache, codeCollab);
  }
}
