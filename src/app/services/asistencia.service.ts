import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AsistenciaService {
  private asignaturaUser: string | null = null;
  private DocenteUser: string | null = null;
  private FechaUser: string | null = null;
  private HoraUser: string | null = null;
  private SalaUser: string | null = null;
  private SeccionUser: string | null = null;
  private LeccionUser: string | null = null;

  setUserAsignatura(asignatura: string) {
    this.asignaturaUser = asignatura;
  }

  getUserAsignatura(): string | null {
    return this.asignaturaUser;
  }

  setUserDocente(docente: string){
    this.DocenteUser= docente;

  }

  getUserDocente(): string | null{
    return this.DocenteUser;


  }

  setUserFecha(fecha: string){
    this.FechaUser= fecha;

  }

  getUserFecha(): string | null{
    return this.FechaUser;


  }
  setUserHora(hora: string){
    this.HoraUser= hora;

  }

  getUserHora(): string | null{
    return this.HoraUser;


  }

  setUserSala(sala: string){
    this.SalaUser= sala;

  }

  getUserSala(): string | null{
    return this.SalaUser;


  }

  setUserSeccion(seccion: string){
    this.SeccionUser= seccion;

  }

  getUserSeccion(): string | null{
    return this.SeccionUser;


  }

  setUserLeccion(leccion: string){
    this.LeccionUser= leccion;

  }

  getUserLeccion(): string | null{
    return this.LeccionUser;


  }

  constructor() { }
}
