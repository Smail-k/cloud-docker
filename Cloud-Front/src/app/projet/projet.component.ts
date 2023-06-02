import { Component, Inject, OnInit, Optional, ViewChild } from '@angular/core';
import { Projet } from '../models/projet';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ProjetService } from '../services/projet.service';


export interface ProjetElement {
  codeProjet: number;
  intituleProjet: string;
  chargeHoraireProjet: number;
}

@Component({
  selector: 'app-projet',
  templateUrl: './projet.component.html',
  styleUrls: ['./projet.component.scss']
})
export class ProjetComponent implements OnInit {
  @ViewChild(MatTable, { static: true }) table: MatTable<any> = Object.create(null);

  searchKey!:any;

  projets?: Projet[];
  selectedValue!: string;
  selectedYearValue!: string;
  selectedFile!: File;
  file!: File;
  
  listData! : MatTableDataSource<any>;
  displayedColumns : string[] = ['code' , 'intitule', 'chargeHoraire','actions' ];
  dataSource!: MatTableDataSource<Projet>;
  @ViewChild(MatSort) sort! : MatSort;


  @ViewChild (MatPaginator) paginator! : MatPaginator;

  selectedYear:any;
  selectedPromotion: any;

  constructor(private dialog: MatDialog, private projetService: ProjetService) { }

  ngOnInit(): void {
    this.ListProjets(); 
  }

  applyFilter(){this.dataSource.filter = this.searchKey.trim().toLocaleLowerCase(); }
  
  onSearchClear(){
    this.searchKey="";
    this.applyFilter();
  }


  ListProjets():void{
  
    this.projetService.listeProjet().subscribe(projets => {
      this.projets = projets;
      //console.log(this.projets);
      this.dataSource = new MatTableDataSource(this.projets);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  openDialog(action: string, obj: any): void {
    obj.action = action;
    const dialogRef = this.dialog.open(ProjetDialogContentComponent, {
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

  addRowData(row_obj: ProjetElement): void {
    const d = new Date();
    this.dataSource.data.push({
      intituleProjet: row_obj.intituleProjet,
      chargeHoraireProjet: row_obj.chargeHoraireProjet,
    });
    
    this.projetService.saveProject(row_obj).subscribe(
      data=> {
        this.ngOnInit();
      } , err => { console.log(err);
      }
     );

    this.table.renderRows();
  }

  updateRowData(row_obj: ProjetElement): boolean | any {
    this.dataSource.data = this.dataSource.data.filter((value, key) => {
      if (value.codeProjet === row_obj.codeProjet) {
        value.intituleProjet = row_obj.intituleProjet;
        value.chargeHoraireProjet = row_obj.chargeHoraireProjet;
      }

      this.projetService.saveProject(row_obj).subscribe(
        data=> {
          this.ngOnInit();
        } , err => { console.log(err);
        }
       );

      return true;
    });
  }

  // tslint:disable-next-line - Disables all
  deleteRowData(row_obj: ProjetElement): boolean | any {
    this.dataSource.data = this.dataSource.data.filter((value, key) => {
      
      return value.codeProjet !== row_obj.codeProjet;
    });

    this.projetService.deleteProject(row_obj.codeProjet).subscribe(
      data=> {
        this.ngOnInit()
        console.log(data);
      } , err => { console.log(err);
      }
     );
     
  }

  /**
   * 
   * @param event 
   */
  onFileChanged(event: any) {
    this.selectedFile = event.target.files[0];
    // Récupération du fichier Excel
    this.file = event.target.files[0];
    const fd = new FormData();
    fd.append('file', this.file);
   
  }

}


@Component({
  // tslint:disable-next-line - Disables all
  selector: 'app-dialog-content',
  templateUrl: 'dialog-content.html',
})
// tslint:disable-next-line - Disables all
export class ProjetDialogContentComponent {
  action: string;
  // tslint:disable-next-line - Disables all
  local_data: any;

  constructor(
    public dialogRef: MatDialogRef<ProjetDialogContentComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: ProjetElement,
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