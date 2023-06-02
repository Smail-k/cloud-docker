import { Component, Inject, OnInit, Optional, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Projet } from '../models/projet';
import { Tache } from '../models/tache';
import { MatSort } from '@angular/material/sort';
import { TacheRealisee } from '../models/tacherealisee';
import { MatPaginator } from '@angular/material/paginator';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ProjetService } from '../services/projet.service';
import { TacheService } from '../services/tache.service';
import { CollaborateurService } from '../services/collaborateur.service';
import { ManagerElement } from '../manager/manager.component';
import { Manager } from '../models/manager';
import { MyserviceService } from '../myservice.service';

export interface TacheRealiseElement {
  codeTache: number;
  intituleTache: string;
  chargeHoraireTache: number;
  chargeHorairePlanifiee: number;
  chargeHoraireRealisee: number;
  status: string;
  codeCollab: string;
  nom: string;
  prenom: string;
}

@Component({
  selector: 'app-affectation',
  templateUrl: './affectation.component.html',
  styleUrls: ['./affectation.component.scss']
})
export class AffectationComponent implements OnInit {

  @ViewChild(MatTable, { static: true }) table: MatTable<any> = Object.create(null);

  roleUser: any;
  userName:any;
  projets: Projet[] = [];
  searchKey!: any;
  taches?: Object[];
  tachesUpdate?: Object[];
  listData!: MatTableDataSource<any>;
  displayedColumns: string[] = ['codeTache', 'intituleTache', 'chargeHoraireTache', 'chargeHorairePlanifiee', 'chargeHoraireRealisee', 'status', 'nom', 'prenom', 'actions'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatSort) sort!: MatSort;


  @ViewChild(MatPaginator) paginator!: MatPaginator;

  selectedProject: any;
  selectedPromotion: any;

  constructor(private dialog: MatDialog, private collaborateurServ: CollaborateurService,
    private projetService: ProjetService, private tacheService: TacheService) { }

  ngOnInit(): void {
    this.roleUser = localStorage.getItem('roleUser');
    this.userName = localStorage.getItem('loggedUser');
    this.getProjets();

  }

  getProjets() {

    this.projetService.listeProjet().subscribe(data => {
      this.projets = data;
      if (this.projets.length != 0) {
        this.selectedProject = this.projets[0].codeProjet;
        if (this.roleUser == 'Collaborateur')
          this.ListerTachesCollab(this.selectedProject, this.userName);
        else
          this.ListerTaches(this.selectedProject);
      }
    },
      err => { console.log(err); }
    )
  }

  ListerTaches(projet: any): void {

    this.tacheService.getTachesRealise(projet).subscribe(taches => {

      this.taches = taches.map(([codeTache, intituleTache, chargeHoraireTache, chargeHorairePlanifiee, chargeHoraireRealisee, status, codeCollab, nom, prenom]): TacheRealiseElement => ({
        codeTache,
        intituleTache,
        chargeHoraireTache,
        chargeHorairePlanifiee,
        chargeHoraireRealisee,
        status,
        codeCollab,
        nom,
        prenom
      }));
      console.log(this.taches);
      
      this.dataSource = new MatTableDataSource(this.taches);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  ListerTachesCollab(projet: any, codeColl: any): void {

    this.tacheService.getTachesRealiseCollab(projet, codeColl).subscribe(taches => {

      this.taches = taches.map(([codeTache, intituleTache, chargeHoraireTache, chargeHorairePlanifiee, chargeHoraireRealisee, status, codeCollab, nom, prenom]): TacheRealiseElement => ({
        codeTache,
        intituleTache,
        chargeHoraireTache,
        chargeHorairePlanifiee,
        chargeHoraireRealisee,
        status,
        codeCollab,
        nom,
        prenom
      }));

      this.dataSource = new MatTableDataSource(this.taches);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter() { this.dataSource.filter = this.searchKey.trim().toLocaleLowerCase(); }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  openDialog(action: string, obj: any): void {
    //console.log(obj);
    
    obj.action = action;
    const dialogRef = this.dialog.open(TacheAffecterDialogContentComponent, {
      data: obj,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.event === 'Add') {
        this.addRowData(result.data);
      } else if (result.event === 'Update') {
        this.updateRowData(result.data);
      } else if (result.event === 'Delete') {
        this.deleteRowData(result.data);
      } else if (result.event === 'Validated') {
        this.validatedRowData(result.data);
      }
    });
  }

  openCkeckDialog(action: string, obj: any): void {
    obj.action = action;
    const dialogRef = this.dialog.open(TacheCheckDialogContentComponent, {
      data: obj,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.event === 'Validated') {
        this.validatedRowData(result.data);
      }else
        this.doneRowData(result.data)
      
    });
  }

  addRowData(row_obj: TacheRealiseElement): void {
    const d = new Date();
    this.dataSource.data.push({
      intituleTache: row_obj.intituleTache,
      chargeHoraireTache: row_obj.chargeHoraireTache,
    });

    this.collaborateurServ.affectTacheCollaborateur(row_obj).subscribe(
      data => {
        this.ngOnInit();
      }, err => {
        console.log(err);
      }
    );
    this.table.renderRows();
  }

  updateRowData(row_obj: TacheRealiseElement): boolean | any {
    this.dataSource.data = this.dataSource.data.filter((value, key) => {
      if (value.codeTache === row_obj.codeTache) {
        value.intituleTache = row_obj.intituleTache;
        value.chargeHoraireTache = row_obj.chargeHoraireTache;
      }

      this.collaborateurServ.affectTacheCollaborateur(row_obj).subscribe(
        data => {
          this.ngOnInit()
        }, err => {
          console.log(err);
        }
      );
      return true;
    });
  }

  // tslint:disable-next-line - Disables all
  deleteRowData(row_obj: TacheRealiseElement): boolean | any {
    this.dataSource.data = this.dataSource.data.filter((value, key) => {
      return value.codeTache !== row_obj.codeTache;
    });
    //console.log(row_obj);
    
    this.tacheService.deleteTaskPk(row_obj).subscribe(
      data=> {
        this.ngOnInit();
      } , err => { console.log(err);
      }
     );

  }

  validatedRowData(row_obj: TacheRealiseElement): void {
    this.collaborateurServ.validerTacheCollaborateur(row_obj).subscribe(
      data => {
        this.ngOnInit()
      }, err => {
        console.log(err);
      }
    );
  }

  doneRowData(row_obj: TacheRealiseElement): void {
    
    this.collaborateurServ.doneTaskCollaborateur(row_obj).subscribe(
      data => {
        this.ngOnInit();
      }, err => {
        console.log(err);
      }
    );
  }

  projetChange(ob: any): void {
    const filterValue = ob.value;
    if (this.roleUser == 'Collaborateur')
          this.ListerTachesCollab(filterValue, this.userName);
        else
          this.ListerTaches(filterValue);
    //this.ListerTaches(filterValue);
  }

}



@Component({
  // tslint:disable-next-line - Disables all
  selector: 'app-dialog-content',
  templateUrl: 'dialog-content.html',
})
// tslint:disable-next-line - Disables all
export class TacheAffecterDialogContentComponent implements OnInit {
  action: string;
  // tslint:disable-next-line - Disables all
  local_data: any;
  projets: Projet[] = [];
  taches?: Tache[];
  collaborateurs: Object[] = [];
  collabs: any[] = [];

  selectedProject: any;
  selectedTache: any;
  selectedCollabo: any;

  ngOnInit(): void {
    
   
    this.selectedTache = this.local_data.codeTache;
    this.selectedCollabo = this.local_data.codeCollab;
    this.getProjets();
    this.ListerCollaborateurs();
  }

  constructor(
    public dialogRef: MatDialogRef<TacheAffecterDialogContentComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: TacheRealiseElement, private tacheService: TacheService,
    private projetService: ProjetService, private collaboService: CollaborateurService
  ) {
    console.log("call 0");
    
    this.local_data = { ...data };
    this.action = this.local_data.action;
    this.selectedTache = this.local_data.codeTache;
    this.selectedCollabo = this.local_data.codeCollab;
  }

  getProjets() {

    this.projetService.listeProjet().subscribe(data => {
      this.projets = data;
      if (this.projets.length != 0) {
        this.selectedProject = this.projets[0].codeProjet;

        this.ListerTaches(this.selectedProject);
      }
    },
      err => { console.log(err); }
    )
  }
  ListerCollaborateurs(): void {

    this.collaboService.listeOnlyCollaborateurs().subscribe(collabos => {

      this.collaborateurs = collabos.map(([codeCollab, nom, prenom, motPasse]): ManagerElement => ({
        codeCollab,
        nom,
        prenom,
        motPasse
      }));

      if (this.collaborateurs.length != 0) {
        this.collabs = this.collaborateurs;
        //this.selectedCollabo = this.collabs[0].codeCollab;
        //this.local_data.codeCollab = this.selectedCollabo;
        
      }

    });
  }

  ListerTaches(projet: any): void {

    this.tacheService.getTaches(projet).subscribe(taches => {
      this.taches = taches;
      if (this.taches.length != 0) {
        //this.selectedTache = this.taches[0].codeTache;
        this.local_data.codeTache = this.selectedTache;
      }
    });
  }


  doAction(): void {
    console.log(this.local_data);
    this.dialogRef.close({ event: this.action, data: this.local_data });
  }

  closeDialog(): void {
    this.dialogRef.close({ event: 'Cancel' });
  }

  projetChange(ob: any): void {
    const filterValue = ob.value;
    this.ListerTaches(filterValue);
  }

  tacheChange(ob: any): void {
    const filterValue = ob.value;
    this.selectedTache = filterValue;
    this.local_data.codeTache = this.selectedTache;

  }
  collabChange(ob: any): void {
    const filterValue = ob.value;
    this.selectedCollabo = filterValue;
    this.local_data.codeCollab = this.selectedCollabo;

  }
}


@Component({
  // tslint:disable-next-line - Disables all
  selector: 'app-dialog-check-content',
  templateUrl: 'dialog-content-check.html',
})
export class TacheCheckDialogContentComponent implements OnInit {
  action: string;
  local_data: any;

  ngOnInit(): void {

  }

  constructor(
    public dialogRef: MatDialogRef<TacheCheckDialogContentComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: TacheRealiseElement, private tacheService: TacheService,
    private projetService: ProjetService, private collaboService: CollaborateurService
  ) {
    this.local_data = { ...data };
    this.action = this.local_data.action;
    
    
  }


  doAction(): void {
    
    this.dialogRef.close({ event: this.action, data: this.local_data });
  }

  closeDialog(): void {
    this.dialogRef.close({ event: 'Cancel' });
  }


}
