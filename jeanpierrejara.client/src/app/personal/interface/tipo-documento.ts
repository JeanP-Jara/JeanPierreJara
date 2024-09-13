export interface TipoDocumento {
    nombre: String,
    validacion: number
}

export const TIPO_DOCUMENTOS: TipoDocumento[] = [
    {nombre: 'DNI', validacion: 8},
	{nombre: 'Carnet de Extranjería', validacion: 12},
	{nombre: 'Pasaporte', validacion: 12},
	{nombre: 'RUC', validacion: 11}
];

