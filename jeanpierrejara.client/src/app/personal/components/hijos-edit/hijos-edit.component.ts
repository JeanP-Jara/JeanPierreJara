import { Component, inject } from '@angular/core';
import { Hijo } from '../../interface/hijo';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { TIPO_DOCUMENTOS, TipoDocumento } from '../../interface/tipo-documento';
import { HijoService } from '../../services/hijo.service';
import { Personal } from '../../interface/personal';

@Component({
  selector: 'app-hijos-edit',
  templateUrl: './hijos-edit.component.html',
  styleUrl: './hijos-edit.component.css'
})
export class HijosEditComponent {
  readonly dialogRef = inject(MatDialogRef<HijosEditComponent>);
  mData = inject<any>(MAT_DIALOG_DATA);

  mHijo!: Hijo;

  mPersonal!: Personal;

  mForm!: FormGroup;

  mListTipoDoc: TipoDocumento[] = TIPO_DOCUMENTOS;

  minFechaNac: string | Date = new Date();
  maxFechaNac = new Date();


  constructor(
    private fb: FormBuilder,
    public _service: HijoService,
  ) { }

  get tipoDoc() {
    return this.mForm.get('tipoDoc');
  }

  get numeroDoc() {
    return this.mForm.get('numeroDoc');
  }

  get apPaterno() {
    return this.mForm.get('apPaterno');
  }

  get apMaterno() {
    return this.mForm.get('apMaterno');
  }

  get nombre1() {
    return this.mForm.get('nombre1');
  }

  get nombre2() {
    return this.mForm.get('nombre2');
  }

  get nombreCompleto() {
    return this.mForm.get('nombreCompleto');
  }

  get fechaNac() {
    return this.mForm.get('fechaNac');
  }

  validDate(control: AbstractControl): ValidationErrors | null {
    const dateValue = control.value;

    const parsedDate = Date.parse(dateValue);
    if (isNaN(parsedDate)) {
      return { invalidDate: true };
    }
  
    return null;
  }

  ngOnInit(): void {
    this.mPersonal = this.mData.personal;
    this.minFechaNac = this.mPersonal.fechaNac;

    if (this.mData.hijo == null) {
      this.mHijo = {
        idHijo: 0,
        idPersonal: this.mPersonal.idPersonal!,
        apMaterno: '',
        apPaterno: '',
        fechaNac: '',
        nombre1: '',
        nombreCompleto: '',
        numeroDoc: '',
        tipoDoc: '',        
        nombre2: ''
      }
    }else{
      this.mHijo = this.mData.hijo;
    }

    this.mForm = this.fb.group({
      idHijo: [this.mHijo.idHijo || 0, []],
      idPersonal: [this.mHijo.idPersonal || 0, []],
      tipoDoc: [this.mHijo.tipoDoc || '', [Validators.required, Validators.minLength(3)]],
      numeroDoc: [this.mHijo.numeroDoc ||'', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.minLength(8), Validators.maxLength(8)]],
      apPaterno: [this.mHijo.apPaterno ||'', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      apMaterno: [this.mHijo.apMaterno ||'', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      nombre1: [this.mHijo.nombre1 ||'', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      nombre2: [this.mHijo.nombre2 ||'', [Validators.maxLength(50)]],
      nombreCompleto: [this.mHijo.nombreCompleto ||'', [Validators.required, Validators.minLength(3), Validators.maxLength(150)]],
      fechaNac: [this.mHijo.fechaNac ||'', [Validators.required, this.validDate]]
    },);
    console.log(this.mHijo);

    this.nombre1!.valueChanges.subscribe(() => this.updateNombreCompleto());
    this.nombre2!.valueChanges.subscribe(() => this.updateNombreCompleto());
    this.apPaterno!.valueChanges.subscribe(() => this.updateNombreCompleto());
    this.apMaterno!.valueChanges.subscribe(() => this.updateNombreCompleto());

    this.mForm.get('tipoDoc')!.valueChanges.subscribe((nombreItem) => {
      const selectedItem = this.mListTipoDoc.find(item => item.nombre === nombreItem);
      if (selectedItem) {
        this.numeroDoc!.setValidators([
          Validators.required,
          Validators.pattern('^[0-9]+$'),
          Validators.minLength(selectedItem.validacion),
          Validators.maxLength(selectedItem.validacion)
        ]);
        this.numeroDoc!.updateValueAndValidity();
      }
    });
    
  }

  updateNombreCompleto() {
    const nombre1 = this.nombre1!.value || '';
    const nombre2 = this.nombre2!.value || '';
    const apPaterno = this.apPaterno!.value || '';
    const apMaterno = this.apMaterno!.value || '';
    const nombreCompleto = `${nombre1} ${nombre2} ${apPaterno} ${apMaterno}`.trim();
    this.nombreCompleto!.setValue(nombreCompleto, { emitEvent: false });
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(){
    let newHijo: Hijo;
    newHijo = this.mForm.value;
    console.log("this.mForm.value", this.mForm.value);
    

    if(this.mForm.value.idHijo > 0){
      
      this._service.EditarHijo(newHijo).subscribe(
        (result) => {
          console.log("result update",result);
        },
        (error) => {
          console.error(error);
        }
      );
    }else{
      this._service.CrearHijo(newHijo).subscribe(
        (result) => {
          console.log("result create",result);
        },
        (error) => {
          console.error(error);
        }
      );
    }
    this.dialogRef.close();
    
  }

}
