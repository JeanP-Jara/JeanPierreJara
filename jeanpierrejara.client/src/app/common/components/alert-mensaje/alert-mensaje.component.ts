import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-alert-mensaje',
  templateUrl: './alert-mensaje.component.html',
  styleUrl: './alert-mensaje.component.css'
})
export class AlertMensajeComponent {
  titulo = "";
  mensaje = "";
  
  constructor(public dialogRef: MatDialogRef<AlertMensajeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {

  }

  ngOnInit() {
    this.titulo = this.data.titulo;
    this.mensaje = this.data.mensaje;
    
  }

  confirmar(){
    this.dialogRef.close(true);
  }
  
  cancelar(){
    this.dialogRef.close(false);
  }
}
