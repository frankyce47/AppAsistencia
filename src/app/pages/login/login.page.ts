import { Component, OnInit } from '@angular/core';
import { ForgotpassPage } from '../forgotpass/forgotpass.page';
import { NavController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import { StorageService } from 'src/app/services/storage.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRoute, Routes } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/services/helper.service';
import { ToastController } from '@ionic/angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';





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
              private route:ActivatedRoute,
              private navCtrl:NavController,
              private userService: UserService,
              private storage:StorageService,
              private auth:AngularFireAuth,
              public toastController: ToastController,
              private formBuilder: FormBuilder

            ) { }

  ngOnInit() {
  
  }
  



 

 async login() {
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

 registro(){
  this.router.navigateByUrl("registro");
}

async obrirModal() {
  const modal = await this.modalCtrl.create({
    component: ForgotpassPage,
  });
  modal.present();

  const { data, role } = await modal.onWillDismiss();

}

async mostrarToast1() {
  const toast = await this.toastController.create({
    message: "BIENVENIDO A REGISTRO PIECE",
    duration: 4000,
    position: 'bottom',
    color: 'success', 
   
  });

  toast.present();
}

async mostrarToast4() {
  const toast = await this.toastController.create({
    message: 'INGRESE UN CORREO VALIDO, INGRESADO ANTERIORMENTE',
    duration: 4000,
    position: 'bottom',
  });

  toast.present();
}

}