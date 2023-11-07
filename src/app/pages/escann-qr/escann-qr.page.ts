import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from 'capacitor-barcode-scanner';
import { HelperService } from 'src/app/services/helper.service';
import { ResulQrPage } from 'src/app/modals/resul-qr/resul-qr.page';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Asistencia } from 'src/app/models/asistencia';



@Component({
  selector: 'app-escann-qr',
  templateUrl: './escann-qr.page.html',
  styleUrls: ['./escann-qr.page.scss'],
})
export class EscannQrPage implements OnInit {
  imageUrl: string | undefined;

  resultQr:any[]=[];
  nombre:string = '';
  asignatura:string = "";
  docente:string = "";
  fecha:string = "";
  hora:string = "";
  leccion:string = "";
  sala:string = "";
  seccion:string = "";

  

  constructor(private helper:HelperService,) { 
    
  }

  ngOnInit() {
  }

  async scanner(){
    var resultadoQr = (await BarcodeScanner.scan()).code;
     
    if (resultadoQr) {
      console.log("QR", JSON.parse(resultadoQr));
    }
    var infoQr = [];
    infoQr.push(
      {
        asignatura:this.asignatura,
        docente:this.docente,
        fecha:this.fecha,
        hora:this.hora,
        leccion:this.leccion,
        sala:this.sala,
        seccion:this.seccion,


      
        },
      
              );

              const parametros = {dataQr:infoQr};
    
    this.helper.showModal(ResulQrPage,parametros);

  }

  

  async takePhoto() {
    const image = await Camera.getPhoto({
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Photos,
      quality: 90,
    });


    this.imageUrl = image.dataUrl;
  }



 
  

}
