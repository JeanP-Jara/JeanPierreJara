import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { Hijo } from '../../interface/hijo';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { HijoService } from '../../services/hijo.service';
import { HijosEditComponent } from '../hijos-edit/hijos-edit.component';
import { ActivatedRoute } from '@angular/router';
import { PersonalService } from '../../services/personal.service';
import { Personal } from '../../interface/personal';
import { AlertPopUpComponent } from '../../../common/components/alert-pop-up/alert-pop-up.component';

@Component({
  selector: 'app-hijos-list',
  templateUrl: './hijos-list.component.html',
  styleUrl: './hijos-list.component.css'
})
export class HijosListComponent implements OnInit{
  displayedColumns: string[] = ['id', 'nombreCompleto', 'tipoDoc', 'numeroDoc', 'fechaNac', 'acciones'];
  tabla!: MatTableDataSource<Hijo>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  readonly dialog = inject(MatDialog);

  idPersonal: string = '';
  personal!: Personal;

  constructor(
    public _service: HijoService,
    private _Activatedroute: ActivatedRoute, 
    public _servicePersonal: PersonalService,
  ) {

  }

  ngOnInit(): void {
    this.idPersonal = this._Activatedroute.snapshot.paramMap.get("idPersonal")!;
    this.getPersonal();
    
  }

  getHijos() {

    this._service.ObtenerHijo( parseInt(this.idPersonal) ).subscribe(
      (result) => {
        console.log(result);
        this.tabla = new MatTableDataSource<Hijo>(result);
        this.tabla.sort = this.sort;
        this.tabla.paginator = this.paginator;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  getPersonal(){
    this._servicePersonal.ObtenerPersonal(parseInt(this.idPersonal)).subscribe(
      (result) => {
        console.log(result);
        this.personal = result;
        this.getHijos();
      },
      (error) => {
        console.error(error);
      }
    )
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.tabla.filter = filterValue.trim().toLowerCase();

    if (this.tabla.paginator) {
      this.tabla.paginator.firstPage();
    }
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string, element: Hijo | null): void {

    const dialogRef = this.dialog.open(HijosEditComponent, {
      width: '1050px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {hijo: element, personal: this.personal},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');    
      this.getHijos();  
    });
  }

  EliminarHijo(element: Hijo){
    const dialogRef = this.dialog.open(AlertPopUpComponent, {
      width: '500px',
      data: { titulo: "¿Desea eliminar el hijo " + element.nombreCompleto + "?" }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._service.EliminarHijo(element.idHijo!).subscribe(
          (result) => {
            console.log(result);
            this.getHijos();
          },
          (error) => {
            console.error(error);
          }
        );
      }
    });
    
  }

}
