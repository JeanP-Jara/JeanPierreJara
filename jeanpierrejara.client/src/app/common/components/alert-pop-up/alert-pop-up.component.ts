import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-alert-pop-up',
  templateUrl: './alert-pop-up.component.html',
  styleUrl: './alert-pop-up.component.css'
})
export class AlertPopUpComponent {

  titulo = "";
  
  constructor(public dialogRef: MatDialogRef<AlertPopUpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {

  }

  ngOnInit() {
    this.titulo = this.data.titulo;
    
  }

  confirmar(){
    this.dialogRef.close(true);
  }
  
  cancelar(){
    this.dialogRef.close(false);
  }

}
