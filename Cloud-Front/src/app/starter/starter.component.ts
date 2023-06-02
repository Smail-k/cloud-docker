import { Component, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormControl, Validators } from '@angular/forms';
import { ProjetService } from '../services/projet.service';
import { CollaborateurService } from '../services/collaborateur.service';
import { TacheService } from '../services/tache.service';

@Component({
  selector: 'app-starter',
  templateUrl: './starter.component.html',
  styleUrls: ['./starter.component.scss']
})
export class StarterComponent implements AfterViewInit {
  currentNbProject!: number;
  currentNbCollabs!: number;
  currentNbTaskDone!: number;
  constructor(private projetService: ProjetService, private collabServ : CollaborateurService, private taskServ: TacheService) { }
  ngAfterViewInit() {
    this.getCurrentNumberProject();
    this.getCurrentNbCollabs();
    this.getCurrentTaskDone();
    console.log("starter page is calling");
    
  }
  getCurrentTaskDone() {
    this.taskServ.getNbTaskDone('validated').subscribe(nb => {
      this.currentNbTaskDone = nb;
    });
  }
  getCurrentNbCollabs() {
    this.collabServ.getNbCollaborateur().subscribe(nb => {
      this.currentNbCollabs = nb;
  });
  }

  getCurrentNumberProject() {
    this.projetService.getNbProjet().subscribe(nb => {
        this.currentNbProject = nb;
    });
  }


}


