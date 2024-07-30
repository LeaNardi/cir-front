export interface TurnoDTO {
    turnoId: number;
	profesionalDni: string;
	fecha: string;
	hora: string;
	obraSocialId: number;
	pacienteId: number;
}

export interface TurnosGenerateDTO {
	profesionalDni: string;
	fecha: string;
	atencionInicio: string;
	atencionFin: string;
	duracion: number;
}
