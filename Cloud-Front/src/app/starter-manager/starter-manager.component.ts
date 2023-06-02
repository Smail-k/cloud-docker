import { Component, OnInit } from '@angular/core';
import { ProjetService } from '../services/projet.service';
import { CollaborateurService } from '../services/collaborateur.service';
import { TacheService } from '../services/tache.service';

@Component({
  selector: 'app-starter-manager',
  templateUrl: './starter-manager.component.html',
  styleUrls: ['./starter-manager.component.scss']
})
export class StarterManagerComponent implements OnInit {

  currentNbTaskValidated!: number;
  currentNbCollabs!: number;
  currentNbTaskDone!: number;

  constructor(private projetService: ProjetService, private collabServ : CollaborateurService, private taskServ: TacheService) { }

  ngOnInit(): void {
    this.getCurrentNbTaskValidated();
    this.getCurrentNbCollabs();
    this.getCurrentTaskDone();
  }

  getCurrentTaskDone() {
    this.taskServ.getNbTaskDone('done').subscribe(nb => {
      this.currentNbTaskDone = nb;
    });
  }
  getCurrentNbCollabs() {
    this.collabServ.getNbCollaborateur().subscribe(nb => {
      this.currentNbCollabs = nb;
  });
  }

  getCurrentNbTaskValidated() {
    this.taskServ.getNbTaskDone('validated').subscribe(nb => {
      this.currentNbTaskValidated = nb;
    });
  }

}
