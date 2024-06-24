export interface ProfesionalDTO {
    dni: string;
    nombre: string;
    apellido: string;
    email: string;
    direccion: string;
    telefono: string;
    fechaIngreso: Date;
    especialidadId: number;
    tituloId: number;
    formacionesComplementarias: string[];
    publicacionesRevistas: string[];
    presentacionesCongresos: string[];
    experienciaLaboral: string[];
}

