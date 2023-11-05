import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/services/helper.service';
import { StorageService } from 'src/app/services/storage.service';
import { Region } from 'src/app/models/region';
import { LocationService } from 'src/app/services/location.service';
import { Usuario } from 'src/app/models/usuario';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  correo:string = "";
  contrasenna:string = "";
  nombre:string = "";
  rut:string ="";
  comunas:any[]=[];
  regiones:Region[]=[];

  comunaSel:number = 0;
  regionSel:number = 0;

  constructor(private router:Router,
              private auth:AngularFireAuth,
              private helper:HelperService,
              private storageService:StorageService,
              private locationService:LocationService

            ) { }

  ngOnInit() {

    this.vistaUser();
    this.cargarRegion();




  }
  navigateToPerfilPage(idempleado: string) {
    this.router.navigate(['perfil', idempleado]);
  }

  volver(){
    this.router.navigateByUrl("login");
  }

  async vistaUser(){
    console.log("USUARIOS STORAGE",await this.storageService.obtenerUser());
  }

  async registro(){
    const loader = await this.helper.showLoader("Cargando");
    if (this.correo == '') {
      await loader.dismiss(); 
      await this.helper.mostrarAlerta("Debe ingresar un correo","Error");
      return;
    }
    if (!this.validarRut(this.rut)) {
      await loader.dismiss();
      await this.helper.mostrarAlerta("RUT no válido", "Error");
      return;
    }
    if (!this.validarNombre(this.nombre)) {
      await loader.dismiss();
      await this.helper.mostrarAlerta("Nombre no válido", "Error");
      return;
    }
      var user = 
      [
        {
          email:this.correo,
          nombre:this.nombre,
          rut:this.rut
        
        }
      ]
      try {
        const request = await this.auth.createUserWithEmailAndPassword(this.correo,this.contrasenna);
          this.storageService.guardarUsuario(user);
        await this.router.navigateByUrl('login');
        await loader.dismiss(); 
        await this.helper.mostrarAlerta("Usuario registrado correctamente","Información");  
        } catch (error:any) {
          if (error.code == 'auth/email-already-in-use') {
            await loader.dismiss();
            await this.helper.mostrarAlerta("El correo ya se encuentra registrado.","Error");
          }
          if (error.code == 'auth/invalid-email') {
            await loader.dismiss();
            await this.helper.mostrarAlerta("El correo no es el correcto.","Error");
          }
          if (error.code == 'auth/weak-password') {
            await loader.dismiss();
            await this.helper.mostrarAlerta("El largo de la contraseña es muy corto.","Error");
          }
        
        }     

  }


validarNombre(nombre: string): boolean {
   
    if (nombre.length < 3) {
      return false; 
    }
  
    return true;
  }

validarRut(rut: string): boolean {
    rut = rut.replace(/\./g, '').replace('-', '').toUpperCase();
    const cuerpo = rut.slice(0, -1);
    const digitoVerificador = rut.slice(-1);
  
    let suma = 0;
    let multiplicador = 2;
  
    for (let i = cuerpo.length - 1; i >= 0; i--) {
      suma += Number(cuerpo[i]) * multiplicador;
      multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
    }
  
    const digitoEsperado = 11 - (suma % 11);
    const digitoEsperadoStr = digitoEsperado === 10 ? 'K' : digitoEsperado.toString();
  
    return digitoEsperadoStr === digitoVerificador;
  }


  async cargarComuna(){
    try {
      const req = await this.locationService.getComuna(this.regionSel);
      this.comunas = req.data;
    } catch (error:any) {
      console.log("ERROR", error);
      
      this.helper.mostrarAlerta(error.error.msg,"Error")
    }
  }

  
  async cargarRegion(){
    try {
      const req = await this.locationService.getRegion();
      this.regiones = req.data;
      console.log("REGIONES",this.regiones);
    } catch (error) {
      
    }
  }
  



}