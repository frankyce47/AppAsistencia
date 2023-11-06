import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { IonCard, NavController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { HelperService } from 'src/app/services/helper.service';
import { UserService } from 'src/app/services/user.service';
import { StorageService } from 'src/app/services/storage.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastController } from '@ionic/angular';
import { Menu } from 'src/app/models/menu';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  usuario:any;
  nombreUsuario:string = "";
  rutUsuario:string = "";

  arrayMenu:Menu[]=[];

  loading:boolean = true;




  email: string | null;



  constructor(private menuCtrl: MenuController,
              private router:Router,
              private helper:HelperService,
              private route: ActivatedRoute ,
              private userService: UserService,
              private storage:StorageService,
              private auth:AngularFireAuth,
              public toastController: ToastController,
              private navCtrl: NavController,
            
             
              

            ) { 
              this.email = this.userService.getUserEmail();
              if (this.email === null) {
                this.email = 'Correo no disponible';
              }
            }

  ngOnInit() {
    this.cargarUsuario();

    console.log("inicio del componente");

    this.cargarPerfil();

    setTimeout(this.simularCargaPerfil, 4000);

  


  }

  async Toast() {
    const toast = await this.toastController.create({
      message: 'ASISTENCIA SECCION: 001D',
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

  async Toast_2() {
    const toast = await this.toastController.create({
      message: 'ESCANE SU CODIGO',
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }

  async Toast_3() {
    const toast = await this.toastController.create({
      message: 'INFORMACION PERSONAL',
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }


 async desLogin(){
  var corfirmar = await this.helper.mostrarConfirmar("Desea cerrar la sesión actual?","Confirmar","Cancelar")
    if (corfirmar == true) {
      await this.auth.signOut();
      await this.router.navigateByUrl("login");
    }
  }

  async openProfile(){
    const loader = await this.helper.showLoader("Cargando");
    this.router.navigateByUrl("perfil");
    await loader.dismiss();
  }

  

 async Asistencia(){
    const loader = await this.helper.showLoader("Cargando");
    this.router.navigateByUrl("asistencia")
    await loader.dismiss();
  }

  

  async Qr(){
    const loader = await this.helper.showLoader("Cargando");
    this.router.navigateByUrl("escann-qr");
    await loader.dismiss();
  }

  async cargarUsuario(){
    console.log("USUARIO STORAGE",await this.storage.obtenerUser());
    console.log("PROPIEDAD SERVICE STORAGE",this.storage.userEmail);

    var user = await this.auth.currentUser;

    this.usuario = (await this.storage.obtenerUser()).filter(e => e.email == user?.email);
    this.nombreUsuario =  this.usuario[0].nombre;
    this.rutUsuario =  this.usuario[0].rut;
  }

  perfil(){
    var parametroN1 = 123456;
    this.router.navigateByUrl(parametroN1 + "/perfil");
  }

  cargarPerfil(){
    this.arrayMenu.push
    (
      {
        id:1,
        titulo:"Perfil",
        icono:"person-outline",
        url:"/001D/perfil",
        disabled:true
      },
    )
  }

  simularCargaPerfil = () => {
    this.loading = false;
  }
  
  

}