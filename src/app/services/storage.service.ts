import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences'; 
import { Usuario } from '../models/usuario';


const storageUser = 'usuarioData';



@Injectable({
  providedIn: 'root'
})
export class StorageService {

  public userEmail:string = "";

  public userName:string = "";

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
}