import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { EspecialidadDTO } from '../../../interfaces/especialidad';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { EspecialidadService } from '../../../services/especialidad.service';

@Component({
  selector: 'app-lista-especialidades',
  templateUrl: './lista-especialidades.component.html',
  styleUrl: './lista-especialidades.component.css'
})
export class ListaEspecialidadesComponent implements OnInit{
    elementEspecialidades: EspecialidadDTO[] = [];
    displayedColumns = ['especialidadId', 'especialidad'];
    dataSource = new MatTableDataSource<EspecialidadDTO>(this.elementEspecialidades)

    @ViewChild(MatTable) tabla!: MatTable<EspecialidadDTO>;
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;


    constructor(private especialidadService: EspecialidadService,
        private changeDetectorRefs: ChangeDetectorRef) { }

    ngOnInit(): void {
        this.cargarEspecialidades();
    }

    cargarEspecialidades(): void {
        this.especialidadService.getEspecialidades().subscribe(
            {
                next: especialidades => {
                    this.dataSource.data = especialidades as EspecialidadDTO[];
                    console.log(especialidades);
                },
                error: err => {
                    console.log(err);
                }
            }
        );
    }
}
