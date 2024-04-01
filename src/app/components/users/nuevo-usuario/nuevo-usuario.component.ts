import { Component, Inject, OnInit } from '@angular/core';
import { User } from '../../../interfaces/user';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-nuevo-usuario',
  templateUrl: './nuevo-usuario.component.html',
  styleUrl: './nuevo-usuario.component.css'
})
export class NuevoUsuarioComponent implements OnInit {

    public insertar:any;  
    
    constructor( public dialogRef: MatDialogRef<NuevoUsuarioComponent>,
                 @ Inject(MAT_DIALOG_DATA) public data: User ) { }
  
    ngOnInit(): void {
    }
  
    // cierre de ventana modal ...
    cancelar(){
      this.dialogRef.close();
    }
  }