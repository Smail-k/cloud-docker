import { Component, OnInit } from '@angular/core';
import { ProjetService } from '../services/projet.service';
import { CollaborateurService } from '../services/collaborateur.service';
import { TacheService } from '../services/tache.service';

@Component({
  selector: 'app-starter-collaborateur',
  templateUrl: './starter-collaborateur.component.html',
  styleUrls: ['./starter-collaborateur.component.scss']
})
export class StarterCollaborateurComponent implements OnInit {

  userName:any;
  currentNbTaskValidated!: number;
  currentNbTaskTodo!: number;
  currentNbTaskDone!: number;

  constructor(private projetService: ProjetService, private collabServ : CollaborateurService, private taskServ: TacheService) { }

  ngOnInit(): void {
    this.userName = localStorage.getItem('loggedUser');
    this.getCurrentNbTaskValidated();
    this.getCurrentNbTaskTodo();
    this.getCurrentTaskDone();
  }

  getCurrentTaskDone() {
    this.taskServ.countTaskCollab(this.userName,'Done').subscribe(nb => {
      this.currentNbTaskDone = nb;
    });
  }
  getCurrentNbTaskTodo() {
    this.taskServ.countTaskCollab(this.userName,'todo').subscribe(nb => {
      this.currentNbTaskTodo = nb;
  });
  }

  getCurrentNbTaskValidated() {
    this.taskServ.countTaskCollab(this.userName,'Validated').subscribe(nb => {
      this.currentNbTaskValidated = nb;
    });
  }

}
