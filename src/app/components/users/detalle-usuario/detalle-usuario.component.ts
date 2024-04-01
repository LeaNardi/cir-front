import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { User } from '../../../interfaces/user';

@Component({
  selector: 'app-detalle-usuario',
  templateUrl: './detalle-usuario.component.html',
  styleUrl: './detalle-usuario.component.css'
})
export class DetalleUsuarioComponent implements OnInit {
  
    constructor(@Inject(MAT_DIALOG_DATA) public data: User,
    public dialogRef: MatDialogRef<DetalleUsuarioComponent>) { }
  
    ngOnInit(): void {
      
    }
  
    // cierre de ventana modal...
    cancelar() : void{
      this.dialogRef.close();
    }
    
  
  }
