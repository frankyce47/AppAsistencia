import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userEmail: string | null = null;
  private userName: string | null = null;

  setUserEmail(email: string) {
    this.userEmail = email;
  }

  getUserEmail(): string | null {
    return this.userEmail;
  }

  setUserName(nombre: string){
    this.userName= nombre;

  }

  getUserName(): string | null{
    return this.userName;


  }



  constructor() { }
}