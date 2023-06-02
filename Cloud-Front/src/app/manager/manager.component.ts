import { Component, Inject, OnInit, Optional, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { CollaborateurService } from '../services/collaborateur.service';
import { Manager } from '../models/manager';

export interface ManagerElement {
  codeCollab: string;
  nom: string;
  prenom: string;
  motPasse: string;
}

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss']
})
export class ManagerComponent implements OnInit {

  @ViewChild(MatTable, { static: true }) table: MatTable<any> = Object.create(null);
  searchKey!:any;
  data: Object[] = [];
  data2: Manager[] = [];
  selectedValue!: string;
  selectedYearValue!: string;

  listData! : MatTableDataSource<any>;
  displayedColumns : string[] = ['code' , 'nom', 'prenom','actions' ];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatSort) sort! : MatSort;


  @ViewChild (MatPaginator) paginator! : MatPaginator;

  selectedYear:any;
  selectedPromotion: any;

  constructor(private dialog: MatDialog,private collaboService: CollaborateurService) { }

  ngOnInit(): void {
    this.ListerManagers(); 
  }

  applyFilter(){this.dataSource.filter = this.searchKey.trim().toLocaleLowerCase(); }
  
  onSearchClear(){
    this.searchKey="";
    this.applyFilter();
  }

   openDialog(action: string, obj: any): void {
    obj.action = action;
      const dialogRef = this.dialog.open(ManagerDialogContentComponent, {
      data: obj,});

      dialogRef.afterClosed().subscribe((result) => {
        if (result.event === 'Add') {
          this.addRowData(result.data);
        } else if (result.event === 'Update') {
          this.updateRowData(result.data);
        } else if (result.event === 'Delete') {
          this.deleteRowData(result.data);
        }
      });

   };

  ListerManagers():void{
   
    this.collaboService.listeOnlyManagers().subscribe(collabos => {
      
      this.data = collabos.map(([codeCollab, nom, prenom, motPasse]): ManagerElement => ({
        codeCollab,
        nom,
        prenom,
        motPasse
      }));
      
      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  addRowData(row_obj: ManagerElement): void {

    this.dataSource.data.push({
      codeCollab: row_obj.codeCollab,
      nom: row_obj.nom,
      prenom: row_obj.prenom,
      motPasse: row_obj.motPasse,
    });
    
    
    this.collaboService.saveManager(row_obj).subscribe(
      data=> {
        this.ngOnInit()
      } , err => { console.log(err);
      }
     );
    this.table.renderRows();
  }

  updateRowData(row_obj: ManagerElement): boolean | any {
    this.dataSource.data = this.dataSource.data.filter((value, key) => {
      if (value.codeCollab === row_obj.codeCollab) {
        value.nom = row_obj.nom;
        value.prenom = row_obj.prenom;
        value.motPasse = row_obj.motPasse;
      }

      this.collaboService.saveManager(row_obj).subscribe(
        data=> {
          this.ngOnInit()
          
        } , err => { console.log(err);
        }
       );
      return true;
    });
  }

  // tslint:disable-next-line - Disables all
  deleteRowData(row_obj: ManagerElement): boolean | any {
    this.dataSource.data = this.dataSource.data.filter((value, key) => {
      return value.codeCollab !== row_obj.codeCollab;
    });

    this.collaboService.deleteManager(row_obj.codeCollab).subscribe(
      data=> {
        this.ngOnInit()
        console.log(data);
      } , err => { console.log(err);
      }
     );
  }


}




@Component({
  // tslint:disable-next-line - Disables all
  selector: 'app-dialog-content',
  templateUrl: 'dialog-content.html',
})
// tslint:disable-next-line - Disables all
export class ManagerDialogContentComponent {
  action: string;
  // tslint:disable-next-line - Disables all
  local_data: any;

  constructor(
    public dialogRef: MatDialogRef<ManagerDialogContentComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: ManagerElement,
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

