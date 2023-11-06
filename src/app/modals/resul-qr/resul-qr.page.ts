import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AsistenciaService } from 'src/app/services/asistencia.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
@Component({
  selector: 'app-resul-qr',
  templateUrl: './resul-qr.page.html',
  styleUrls: ['./resul-qr.page.scss'],
})
export class ResulQrPage implements OnInit {
  asignatura:string = "";
  docente:string = "";
  fecha:string = "";
  hora:string = "";
  leccion:string = "";
  sala:string = "";
  seccion:string = "";

  
  @Input() dataQr:any;
  dataAsistencia:any;

  

  constructor(private modalController:ModalController,
              private storageService:StorageService,
              private router:Router,
             
            ) { }

  ngOnInit() {

    console.log("Propiedades recibidas-->",this.dataQr);

    
  }

  close(){
    this.modalController.dismiss();
  }


  async Asistencia1(){

    var asistencia = 
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