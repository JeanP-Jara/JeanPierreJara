import { Component, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Personal } from '../../interface/personal';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { TIPO_DOCUMENTOS, TipoDocumento } from '../../interface/tipo-documento';
import { MatSelectChange } from '@angular/material/select';
import { PersonalService } from '../../services/personal.service';

@Component({
  selector: 'app-personal-edit',
  templateUrl: './personal-edit.component.html',
  styleUrl: './personal-edit.component.css'
})
export class PersonalEditComponent implements OnInit{
  readonly dialogRef = inject(MatDialogRef<PersonalEditComponent>);
  mPersonal = inject<Personal>(MAT_DIALOG_DATA);

  mForm!: FormGroup;

  mListTipoDoc: TipoDocumento[] = TIPO_DOCUMENTOS;

  minFechaNac = new Date(1950, 0, 1);
  maxFechaNac = new Date();
  
  
  minFechaIngreso!: Date;
  maxFechaIngreso = new Date();

  constructor(
    private fb: FormBuilder,
    public _service: PersonalService,
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

  get fechaIngreso() {
    return this.mForm.get('fechaIngreso');
  }

  validDate(control: AbstractControl): ValidationErrors | null {
    const dateValue = control.value;

    const parsedDate = Date.parse(dateValue);
    if (isNaN(parsedDate)) {
      return { invalidDate: true };
    }
  
    return null;
  }

  dateRangeValidator(startDate: string, endDate: string) {
    return (group: AbstractControl): ValidationErrors | null => {
      const start = group.get(startDate)?.value;
      const end = group.get(endDate)?.value;
  
      if (start && end) {
        const startDateParsed = Date.parse(start);
        const endDateParsed = Date.parse(end);
  
        if (startDateParsed > endDateParsed) {
          return { dateRangeInvalid: true };
        }
      }
  
      return null;
    };
  }

  ngOnInit(): void {
    if (this.mPersonal == null) {
      this.mPersonal = {
        apMaterno: '',
        apPaterno: '',
        fechaIngreso: '',
        fechaNac: '',
        nombre1: '',
        nombreCompleto: '',
        numeroDoc: '',
        tipoDoc: '',
        idPersonal: 0,
        nombre2: ''
      }
    }
    this.mForm = this.fb.group({
      idPersonal: [this.mPersonal.idPersonal || 0, []],
      tipoDoc: [this.mPersonal.tipoDoc || '', [Validators.required, Validators.minLength(3)]],
      numeroDoc: [this.mPersonal.numeroDoc ||'', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.minLength(8), Validators.maxLength(8)]],
      apPaterno: [this.mPersonal.apPaterno ||'', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      apMaterno: [this.mPersonal.apMaterno ||'', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      nombre1: [this.mPersonal.nombre1 ||'', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      nombre2: [this.mPersonal.nombre2 ||'', [Validators.maxLength(50)]],
      nombreCompleto: [this.mPersonal.nombreCompleto ||'', [Validators.required, Validators.minLength(3), Validators.maxLength(150)]],
      fechaNac: [this.mPersonal.fechaNac ||'', [Validators.required, this.validDate]],
      fechaIngreso: [this.mPersonal.fechaIngreso ||'', [Validators.required, this.validDate]],
    },
    { validators: this.dateRangeValidator('fechaNac', 'fechaIngreso') });
    console.log(this.mPersonal);

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

    this.fechaNac?.valueChanges.subscribe(value => {
      if (value) {
        const fechaNacimiento = new Date(value);
        const minFechaIngreso = new Date(fechaNacimiento);
        minFechaIngreso.setFullYear(minFechaIngreso.getFullYear() + 18);
        this.minFechaIngreso = minFechaIngreso;
        this.fechaIngreso?.updateValueAndValidity();
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
    let newPersonal: Personal;
    newPersonal = this.mForm.value;

    if(this.mForm.value.idPersonal > 0){
      
      this._service.EditarPersonal(newPersonal).subscribe(
        (result) => {
          console.log("result update",result);
        },
        (error) => {
          console.error(error);
        }
      );
    }else{
      this._service.CrearPersonal(newPersonal).subscribe(
        (result) => {
          console.log("result update",result);
        },
        (error) => {
          console.error(error);
        }
      );
    }
    this.dialogRef.close();
    
  }
  



}
