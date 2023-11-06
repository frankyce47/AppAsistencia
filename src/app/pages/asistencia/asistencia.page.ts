import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage implements OnInit {
  asistencia:any;
  nombre:string = '';
  asignatura:string = "";
  docente:string = "";
  fecha:string = "";
  hora:string = "";
  leccion:string = "";
  sala:string = "";
  seccion:string = "";
 

  constructor( private storage:StorageService,
              private storageService:StorageService) { }

  ngOnInit() {
   
  }

  async cargarAsistencia1(){
    console.log("ASISTENCIA STORAGE",await this.storage.obtenerAsistencia());
    console.log("PROPIEDAD SERVICE STORAGE",this.storage.asignaturaUser);

    var asistencia= 
  [
    { 
    asignatura :  this.asignatura,
    docente :  this.docente,
    fecha :  this.fecha,
    hora :  this.hora,
    sala :  this.sala,
    seccion :  this.seccion,
    leccion :  this.leccion
  }
]
try {
  this.storageService.guardarAsistencia(asistencia);


  } catch (error:any) {}

    
  }



 
  


}
