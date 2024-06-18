import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { RoleDTO } from '../../../interfaces/role';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { RoleService } from '../../../services/role.service';

@Component({
  selector: 'app-lista-roles',
  templateUrl: './lista-roles.component.html',
  styleUrl: './lista-roles.component.css'
})
export class ListaRolesComponent implements OnInit{
    elementRoles: RoleDTO[] = [];
    displayedColumns = ['roleId', 'role'];
    dataSource = new MatTableDataSource<RoleDTO>(this.elementRoles)

    @ViewChild(MatTable) tabla!: MatTable<RoleDTO>;
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;


    constructor(private roleService: RoleService,
        private changeDetectorRefs: ChangeDetectorRef) { }

    ngOnInit(): void {
        this.cargarRoles();
    }

    cargarRoles(): void {
        this.roleService.getRoles().subscribe(
            {
                next: roles => {
                    this.dataSource.data = roles as RoleDTO[];
                    console.log(roles);
                },
                error: err => {
                    console.log(err);
                }
            }
        );
    }
}
