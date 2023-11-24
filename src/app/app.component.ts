import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Inicio', url: '/folder/inbox', icon: 'home' },
    { title: 'Login', url: 'login', icon: 'log-in' },
    { title: 'Registro', url: 'register', icon: 'add' },
    { title: 'Recuperar', url: 'forgotpass', icon: 'cloud-done' },
    { title: 'MenuQR', url: 'menuqr', icon: 'aperture' },
    { title: 'Visualizar', url: 'visualizar', icon: 'eye' },
    { title: 'Animaciones Random', url: 'animation', icon: 'car' },
  ];
  public labels = ['PGY4121001D'];
  constructor() {}
}
