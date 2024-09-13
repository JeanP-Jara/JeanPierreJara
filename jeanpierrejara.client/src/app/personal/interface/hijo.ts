export interface Hijo {
    idHijo: number,
    idPersonal: number;
    tipoDoc: string;
    numeroDoc: string;
    apPaterno: string;
    apMaterno: string;
    nombre1: string;
    nombre2?: string;
    nombreCompleto: string;
    fechaNac: string | Date;
}
