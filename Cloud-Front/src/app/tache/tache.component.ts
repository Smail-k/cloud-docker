import { Component, Inject, OnInit, Optional, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Tache } from '../models/tache';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ProjetService } from '../services/projet.service';
import { TacheService } from '../services/tache.service';
import { Projet } from '../models/projet';

export interface TacheElement {
  codeTache: number;
  intituleTache: string;
  chargeHoraireTache:number;
  codeProjet?:number
}

@Component({
  selector: 'app-tache',
  templateUrl: './tache.component.html',
  styleUrls: ['./tache.component.scss']
})
export class TacheComponent implements OnInit {
  @ViewChild(MatTable, { static: true }) table: MatTable<any> = Object.create(null);

  projets: Projet[]=[];
  searchKey!:any;
  taches?: Tache[];
  listData! : MatTableDataSource<any>;
  displayedColumns : string[] = ['code' , 'intitule', 'chargeHoraire','actions' ];
  dataSource!: MatTableDataSource<Tache>;
  @ViewChild(MatSort) sort! : MatSort;


  @ViewChild (MatPaginator) paginator! : MatPaginator;

  selectedProject:any;

  constructor(private dialog: MatDialog, private projetService: ProjetService, private tacheService: TacheService) { }

  ngOnInit(): void {
    this.getProjets(); 
  }

  getProjets(){
    
    this.projetService.listeProjet().subscribe(data => { 
      this.projets=data;
      //console.log(this.projets);
      
      if (this.projets.length!=0){
        this.selectedProject = this.projets[0].codeProjet;
        this.ListerTaches(this.selectedProject);}
      } , 
      err => { console.log(err);}
    )
  }

  ListerTaches(projet:any):void{
   
    this.tacheService.getTaches(projet).subscribe(taches => {
      this.taches = taches;
      this.dataSource = new MatTableDataSource(this.taches);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }


  applyFilter(){this.dataSource.filter = this.searchKey.trim().toLocaleLowerCase(); }
  
  onSearchClear(){
    this.searchKey="";
    this.applyFilter();
  }


  openDialog(action: string, obj: any): void {
    obj.action = action;
    obj.codeProjet = this.selectedProject
    const dialogRef = this.dialog.open(TacheDialogContentComponent, {
      data: obj,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.event === 'Add') {
        this.addRowData(result.data);
      } else if (result.event === 'Update') {
        this.updateRowData(result.data);
      } else if (result.event === 'Delete') {
        this.deleteRowData(result.data);
      }
    });
  }

  addRowData(row_obj: TacheElement): void {
    const d = new Date();
    this.dataSource.data.push({
      intituleTache: row_obj.intituleTache,
      chargeHoraireTache: row_obj.chargeHoraireTache,
    });
    this.tacheService.saveTache(row_obj).subscribe(
      data=> {
        this.ngOnInit()
        
      } , err => { console.log(err);
      }
     );
    
    this.table.renderRows();
  }

  updateRowData(row_obj: TacheElement): boolean | any {

    this.dataSource.data = this.dataSource.data.filter((value, key) => {
      if (value.codeTache === row_obj.codeTache) {
        this.selectedProject = row_obj.codeProjet;
        value.intituleTache = row_obj.intituleTache;
        value.chargeHoraireTache = row_obj.chargeHoraireTache;

       
        this.tacheService.updateTache(row_obj).subscribe(
        data=> {
          this.ngOnInit()
        } , err => { console.log(err);
        }
       );

      }
      
      return true;
    });
  }

  // tslint:disable-next-line - Disables all
  deleteRowData(row_obj: TacheElement): boolean | any {
    this.dataSource.data = this.dataSource.data.filter((value, key) => {
      return value.codeTache !== row_obj.codeTache;
    });
    this.tacheService.deleteTache(row_obj.codeTache).subscribe(
      data=> {
        this.ngOnInit()
      } , err => { console.log(err);
      }
     );

  }

  projetChange(ob: any): void {
    const filterValue = ob.value;
    this.selectedProject = filterValue;
    this.ListerTaches(filterValue);
  }

}



@Component({
  // tslint:disable-next-line - Disables all
  selector: 'app-dialog-content',
  templateUrl: 'dialog-content.html',
})
// tslint:disable-next-line - Disables all
export class TacheDialogContentComponent implements OnInit {
  action: string;
  // tslint:disable-next-line - Disables all
  local_data: any;
  projets: Projet[]=[];
  selectedProject:any;

  ngOnInit(): void {
    this.selectedProject = this.local_data.codeProjet;
    this.getProjets(); 
  }
  constructor(
    public dialogRef: MatDialogRef<TacheDialogContentComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: TacheElement, private projetService: ProjetService
  ) {
    this.local_data = { ...data };
    this.action = this.local_data.action;
  }

  getProjets(){
    
    this.projetService.listeProjet().subscribe(data => { 
      this.projets=data;
     
      if (this.projets.length!=0){
        //this.selectedProject = this.projets[0].codeProjet;
        //this.ListerTaches(this.selectedProject);
      }
      } , 
      err => { console.log(err);}
    )
  }

  doAction(): void {
    this.dialogRef.close({ event: this.action, data: this.local_data });
  }

  closeDialog(): void {
    this.dialogRef.close({ event: 'Cancel' });
  }

  projetChange(ob: any): void {
    const filterValue = ob.value;
    this.local_data.codeProjet = this.selectedProject
  }

}
