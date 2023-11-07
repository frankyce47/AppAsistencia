import { Component, OnInit } from '@angular/core';
import { ForgotpassPage } from '../forgotpass/forgotpass.page';

import { UserService } from 'src/app/services/user.service';
import { StorageService } from 'src/app/services/storage.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/services/helper.service';
import { ToastController } from '@ionic/angular';
import { ActivatedRoute, Routes } from '@angular/router';






@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email:string = "";
  contrasenna:string = "";
  mensage: string = "";
  isLoading: boolean = false;


  constructor(private router:Router, 
              private helperService:HelperService,
              private modalCtrl:ModalController, 
              private storage:StorageService,
              private auth:AngularFireAuth,
              public toastController: ToastController,
              private userService: UserService,
              private route:ActivatedRoute
            

            ) { }

  ngOnInit() {
  
  }
  async Toast1() {
    const toast = await this.toastController.create({
      message: "BIENVENIDO A LALOREGISTER ",
      duration: 4000,
      position: 'bottom',
      color: 'success', 
     
    });
  
    toast.present();
  }
  
  async Toast4() {
    const toast = await this.toastController.create({
      message: 'INGRESE UN CORREO VALIDO',
      duration: 1000,
      position: 'bottom',
    });
  
    toast.present();
  }
  
 async logearse() {
  if (!this.email || !this.contrasenna) {
    this.helperService.mostrarAlerta("Por favor, complete todos los campos.", "Advertencia");
    return;
  }

  try {
    const req = await this.auth.signInWithEmailAndPassword(this.email, this.contrasenna);
    this.storage.userEmail = this.email;
    console.log("TOKEN", await req.user?.getIdToken());
    await this.router.navigateByUrl("menu");
  } catch (error) {
    
    console.error("Error de autenticación:", error);
  }
}

 registrarse(){
  this.router.navigateByUrl("registro");
}

async Modal() {
  const modal = await this.modalCtrl.create({
    component: ForgotpassPage,
  });
  modal.present();

  const { data, role } = await modal.onWillDismiss();

}

async Toast3() {
  const toast = await this.toastController.create({
    message: 'INGRESE LOS DATOS CORRESPONDIENTES',
    duration: 1000,
    position: 'bottom',
  });

  toast.present();
}



}