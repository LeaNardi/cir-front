import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { TurnoDTO } from '../../../interfaces/turno';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';import { MatTable, MatTableDataSource } from '@angular/material/table';

@Component({
    selector: 'app-lista-turnos',
    templateUrl: './lista-turnos.component.html',
    styleUrl: './lista-turnos.component.css'
})
export class ListaTurnosComponent implements OnInit {
    turnos: TurnoDTO[] = [];
    displayedColumns = ['fecha', 'profesionalDni', 'Hora'];
    dataSource = new MatTableDataSource<TurnoDTO>(this.turnos);

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    ngOnInit(): void {
        this.turnos = [
            { "turnoId": 3, "profesionalDni": "35584700", "fecha": "2024-07-15", "hora": "08:00:00", "obraSocialId": 0, "pacienteId": 0 },
            { "turnoId": 4, "profesionalDni": "35584700", "fecha": "2024-07-15", "hora": "08:15:00", "obraSocialId": 0, "pacienteId": 0 },
            { "turnoId": 5, "profesionalDni": "35584700", "fecha": "2024-07-15", "hora": "08:30:00", "obraSocialId": 0, "pacienteId": 0 },
            { "turnoId": 6, "profesionalDni": "35584700", "fecha": "2024-07-15", "hora": "08:45:00", "obraSocialId": 0, "pacienteId": 0 }
        ];
        this.dataSource.data = this.turnos;
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

}
