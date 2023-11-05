import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor(private alertService:AlertController,
              private loadingController:LoadingController,
              private toastController:ToastController,
              private modalController:ModalController

            ) { }

          

  
  async mostrarAlerta(msg:string, title:string){
    var alert = await this.alertService.create({cssClass:"alertClass",message:msg,header:title,buttons:['Aceptar']});
    await alert.present();
    return alert;
  }

  async mostrarConfirmar(message:string,btn_confirmar:string,btn_cancelar:string){
    let promise = new Promise<boolean>(async (resolve)=>{
      var alert = await this.alertService.create({cssClass:"",message:message,buttons:[
        {
          text:btn_confirmar,
          role:'confirm',
          handler: () =>{
            resolve(true);
          }
        },
        {
          text:btn_cancelar,
          role: 'cancel',
          handler: () =>{
            resolve(false);
          }
        }
      ]})
      await alert.present();

    })
    return promise;
  }

  async showLoader(msg:string){
    var loader = await this.loadingController.create({cssClass:"loaderClass",message:msg,translucent:true})
    await loader.present();
    return loader;
  }




  
  async showModal(component:any,props:any = {},hideable = false){
    var modal = await this.modalController.create
    (
      {
        component:component,
        cssClass:"cssModal",
        componentProps:props,
        backdropDismiss:hideable
      }
    )
    await modal.present();
  }

  sumar(n1:number,n2:number){
    var resultado = n1 + n2;
    return resultado;
  }

}