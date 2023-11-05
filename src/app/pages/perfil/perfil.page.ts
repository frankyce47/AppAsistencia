import { Component, OnInit, ElementRef,ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { StorageService } from 'src/app/services/storage.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  usuario:any;
  nombreUsuario:string = "";
  rutUsuario:string = "";

  parametronumeroUno:number | undefined;

  constructor( private router:Router,
               private auth:AngularFireAuth,
               private userService: UserService,
               private storage:StorageService,
               private activatedRoute:ActivatedRoute


            ) { }

  ngOnInit() {

    this.cargarUsuario1();

    this.parametronumeroUno = this.activatedRoute.snapshot.params['num'];
    console.log("parametro: ", this.parametronumeroUno);

}

  volver1(){
    this.router.navigateByUrl("menu");
  }

  async cargarUsuario1(){
    console.log("USUARIO STORAGE",await this.storage.obtenerUser());
    console.log("PROPIEDAD SERVICE STORAGE",this.storage.userEmail);

    var user = await this.auth.currentUser;

    this.usuario = (await this.storage.obtenerUser()).filter(e => e.email == user?.email);
    this.nombreUsuario =  this.usuario[0].nombre;
    this.rutUsuario =  this.usuario[0].rut;
    
  }

}
