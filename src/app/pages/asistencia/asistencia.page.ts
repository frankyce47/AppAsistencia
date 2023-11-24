import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AsistenciaService } from 'src/app/services/asistencia.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage implements OnInit {


  asistencias: any;
  nasignatura:string = "";
   ndocente:string = "";
   nfecha:string = "";
   nhora:string = "";
   nleccion:string = "";
   nsala:string = "";
   nseccion:string = "";
 

  constructor(  private asistenciaService:AsistenciaService,
                private router:Router,) { }

  ngOnInit() {

    this.loadAsistencia();
   
  }

  volverM(){
    this.router.navigateByUrl("menu")
   }
  
   ionViewDidEnter() {
  
   
  }
  
  async loadAsistencia(){
    console.log("ASISTENCIA GUARDADA",await this.asistenciaService.obtenerAsis());
    this.asistencias = (await this.asistenciaService.obtenerAsis());
    this.nasignatura =  this.asistencias[0].asignatura;
    this.ndocente =  this.asistencias[0].docente;
    this.nfecha =  this.asistencias[0].fecha;
    this.nhora =  this.asistencias[0].hora;
    this.nleccion =  this.asistencias[0].leccion;
    this.nsala =  this.asistencias[0].sala;
    this.nseccion =  this.asistencias[0].seccion;
    
  }
  

 



 
  


}
