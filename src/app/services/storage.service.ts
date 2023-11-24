import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences'; 
import { Usuario } from '../models/usuario';
import {Asistencia } from '../models/asistencia';

const storageUser = 'usuarioData';


const storageAsistencia = 'asistenciaData';


@Injectable({
  providedIn: 'root'
})
export class StorageService {

  public userEmail:string = "";

  public userName:string = "";


  public asignaturaUser: string = "";

  public docenteUser: string = "";

  constructor() { }

  async getItem(key:string):Promise<string | null>{
    const obj = await Preferences.get({key:key});
    return obj.value;
  }

  async setItem(llave:string,valor:string){
    await Preferences.set({key:llave,value:valor});
  }

  async obtenerUser():Promise<Usuario[]>{
    const storageData = await this.getItem(storageUser);
    if (storageData == null) {
      return[];
    }


    const data:any[] = JSON.parse(storageData);
    if (data) {
      return data;
    }
    else{
      return [];
    }
  }


  async guardarUsuario(usuario:Usuario[]){
    var usuarios = await this.obtenerUser();
    for (const i of usuarios) {
      if (i) {
        usuario.push(i);
      }
    }
    this.setItem(storageUser,JSON.stringify(usuario));
  }
  async obtenerAsistencia():Promise<Asistencia[]>{
    const storageData = await this.getItem(storageAsistencia);
    if (storageData == null) {
      return[];
    }


    const data:any[] = JSON.parse(storageData);
    if (data) {
      return data;
    }
    else{
      return [];
    }
  }

  async guardarAsistencia(asistencia:Asistencia[]){
    var asistencias = await this.obtenerAsistencia();
    for (const i of asistencias) {
      if (i) {
        asistencia.push(i);
      }
    }
    this.setItem(storageAsistencia,JSON.stringify(asistencia));
  }
}