import { Component, inject, ViewChild } from '@angular/core';
import { Personal } from '../../interface/personal';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { PersonalService } from '../../services/personal.service';
import { MatDialog } from '@angular/material/dialog';
import { PersonalEditComponent } from '../personal-edit/personal-edit.component';
import { Router } from '@angular/router';
import { AlertPopUpComponent } from '../../../common/components/alert-pop-up/alert-pop-up.component';
import { AlertMensajeComponent } from '../../../common/components/alert-mensaje/alert-mensaje.component';

@Component({
  selector: 'app-personal-list',
  templateUrl: './personal-list.component.html',
  styleUrl: './personal-list.component.css'
})
export class PersonalListComponent {
  displayedColumns: string[] = ['id', 'nombreCompleto', 'tipoDoc', 'numeroDoc', 'fechaNac', 'fechaIngreso', 'acciones'];
  tabla!: MatTableDataSource<Personal>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  readonly dialog = inject(MatDialog);

  constructor(
    public _service: PersonalService,
    public router: Router,
  ) {

  }

  ngOnInit(): void {
    this.getPersonal();
  }

  getPersonal() {

    this._service.ListarPersonal().subscribe(
      (result) => {
        console.log(result);
        this.tabla = new MatTableDataSource<Personal>(result);
        this.tabla.sort = this.sort;
        this.tabla.paginator = this.paginator;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.tabla.filter = filterValue.trim().toLowerCase();

    if (this.tabla.paginator) {
      this.tabla.paginator.firstPage();
    }
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string, element: Personal | null): void {
    const dialogRef = this.dialog.open(PersonalEditComponent, {
      width: '1050px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: element,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');    
      this.getPersonal();  
    });
  }

  EliminarPersonal(element: Personal){
    const dialogRef = this.dialog.open(AlertPopUpComponent, {
      width: '500px',
      data: { titulo: "¿Desea eliminar el trabjador " + element.nombreCompleto + "?" }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._service.EliminarPersonal(element.idPersonal!).subscribe(
          (result) => {
            console.log(result);
            if(!result.isSuccess){
              this.dialog.open(AlertMensajeComponent, {
                width: '500px',
                data: { 
                  titulo: "Accion no permitida" ,
                  mensaje: "El personal cuenta con registro de hijos. Elimine los hijos primero."
                }
              });
            }
            
            this.getPersonal();
          },
          (error) => {
            console.error(error);
          }
        );
      }
    });
    
  }

  showHijos(element: Personal){
    this.router.navigate(["/hijos/" + element.idPersonal]);
  }
}
