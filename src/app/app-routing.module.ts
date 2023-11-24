import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/compat/auth-guard';
const redireccionLogin = () => redirectUnauthorizedTo(['/login']);
const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full'
  },
 

  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./pages/registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'forgotpass',
    loadChildren: () => import('./pages/forgotpass/forgotpass.module').then( m => m.ForgotpassPageModule)
  },
  {
    path: 'inicio',
    loadChildren: () => import('./pages/inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    canActivate:[AngularFireAuthGuard], 
    data:{authGuardPipe: redireccionLogin},
    path: 'menu',
    loadChildren: () => import('./pages/menu/menu.module').then( m => m.MenuPageModule)
  },
  {
    canActivate:[AngularFireAuthGuard], 
    data:{authGuardPipe: redireccionLogin},
    path: 'asistencia',
    loadChildren: () => import('./pages/asistencia/asistencia.module').then( m => m.AsistenciaPageModule)
  },
  {
    canActivate:[AngularFireAuthGuard], 
    data:{authGuardPipe: redireccionLogin},
    path: 'escann-qr',
    loadChildren: () => import('./pages/escann-qr/escann-qr.module').then( m => m.EscannQrPageModule)
  },
  {
    canActivate:[AngularFireAuthGuard], 
    data:{authGuardPipe: redireccionLogin},
    path: ':num/perfil',
    loadChildren: () => import('./pages/perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    canActivate:[AngularFireAuthGuard], 
    data:{authGuardPipe: redireccionLogin},
    path: 'resul-qr',
    loadChildren: () => import('./modals/resul-qr/resul-qr.module').then( m => m.ResulQrPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
