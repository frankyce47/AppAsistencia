import { Injectable } from '@angular/core';
import { Asistencia } from '../models/asistencia';
import { Preferences } from '@capacitor/preferences';


const storageAsistencia = 'asistenciaData';
@Injectable({
  providedIn: 'root'
})
export class AsistenciaService {

  private storageKey = 'asistencias'; 
 



  constructor() { }

  

  guardarAsis(asistencia:any): void {
    
    const asistenciasGuardadas = this.obtenerAsis();

   
    asistenciasGuardadas .push(asistencia);

   
    localStorage.setItem(this.storageKey, JSON.stringify(asistenciasGuardadas ));
  }

  obtenerAsis(): any [] {
    
    const asistenciasGuardadas  = localStorage.getItem(this.storageKey);

    
    return asistenciasGuardadas  ? JSON.parse(asistenciasGuardadas ) : [];
  }
}
