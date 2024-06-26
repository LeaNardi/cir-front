export interface ProfesionalDTO {
    dni: string;
    nombre: string;
    apellido: string;
    email: string;
    direccion: string;
    telefono: string;
    fechaIngreso: Date;
    activo: boolean;
    especialidadId: number;
    tituloId: number;
    formacionesComplementarias: string[];
    publicacionesRevistas: string[];
    presentacionesCongresos: string[];
    experienciaLaboral: string[];
}

export interface ExistsResponse{
    exists: boolean;
    active: boolean;
}
