export interface ProfesionalDTO {
    dni: string;
    nombre: string;
    apellido: string;
    email: string;
    direccion: string;
    telefono: string;
    fechaIngreso: Date;
    activo: boolean;
    motivobaja?: string;
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

export interface Item{
    item: boolean;
    text: boolean;
}

export interface ProfesionalDTOSimp {
    dni: string;
    nombre: string;
    apellido: string;
    especialidadId: number;
}