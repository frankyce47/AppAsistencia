import { Component, Input, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AsistenciaService } from 'src/app/services/asistencia.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { HelperService } from 'src/app/services/helper.service';
@Component({
  selector: 'app-resul-qr',
  templateUrl: './resul-qr.page.html',
  styleUrls: ['./resul-qr.page.scss'],
})
export class ResulQrPage implements OnInit {
  @Input() asistencias:any;
  infoQr: any;
  
  dataAsistencia:any;

  nombre:string = '';
  asignatura:string = "";
  docente:string = "";
  fecha:string = "";
  hora:string = "";
  leccion:string = "";
  sala:string = "";
  seccion:string = "";

  

  constructor(private modalController:ModalController,
              private storageService:StorageService,
              private router:Router,
              private asistenciaService:AsistenciaService,
              private helper:HelperService,
              private navParams: NavParams
             
            ) { this.infoQr = this.navParams.get('dataQr');
            console.log('Info QR:', this.infoQr)}

  ngOnInit() {

  

    
  }

  close(){
    this.modalController.dismiss();
  }

 

  async vistaAsistencia(){
    console.log("ASISTENCIA STORAGE",await this.asistenciaService.obtenerAsis());
  }


  async guardarAsistencia(){

    this.modalController.dismiss({
      infoQr: this.infoQr
    });

    this.asistenciaService.guardarAsis(this.infoQr);
    await this.helper.mostrarAlerta("Debe revisar su asistencia","Información");
    

  }


}