import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ObraSocialDTO } from '../../../interfaces/obrasocial';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ObraSocialService } from '../../../services/obrasocial.service';

@Component({
  selector: 'app-lista-os',
  templateUrl: './lista-os.component.html',
  styleUrl: './lista-os.component.css'
})
export class ListaOsComponent implements OnInit{
    elementObrasSociales: ObraSocialDTO[] = [];
    displayedColumns = ['obraSocialId', 'obraSocial'];
    dataSource = new MatTableDataSource<ObraSocialDTO>(this.elementObrasSociales)

    @ViewChild(MatTable) tabla!: MatTable<ObraSocialDTO>;
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;


    constructor(private obraSocialService: ObraSocialService,
        private changeDetectorRefs: ChangeDetectorRef) { }

    ngOnInit(): void {
        this.cargarObrasSociales();
    }

    cargarObrasSociales(): void {
        this.obraSocialService.getObrasSociales().subscribe(
            {
                next: obrasSociales => {
                    this.dataSource.data = obrasSociales as ObraSocialDTO[];
                    console.log(obrasSociales);
                },
                error: err => {
                    console.log(err);
                }
            }
        );
    }
}