import { ComponentFixture, TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { ForgotpassPage } from './forgotpass.page';
import { AngularDelegate, IonicModule, ModalController } from '@ionic/angular';
import { InjectionToken } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/compat/auth';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HelperService } from 'src/app/services/helper.service';
import { Router } from '@angular/router';

describe('ForgotpassPage', () => {
  let component: ForgotpassPage;
  let fixture: ComponentFixture<ForgotpassPage>;
  let authServiceSpy: jasmine.SpyObj<AngularFireAuth>;
  let helperServiceSpy: jasmine.SpyObj<HelperService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async(() => {
    const authSpy = jasmine.createSpyObj('AngularFireAuth', ['sendPasswordResetEmail']);
    const helperSpy = jasmine.createSpyObj('HelperService', ['showLoader', 'mostrarAlerta']);
    let routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);


    TestBed.configureTestingModule({declarations:[ForgotpassPage],providers:[ModalController,AngularDelegate,InjectionToken,{provide:AngularFireAuth,useValue:authSpy},{provide:HelperService,useValue:helperSpy},{provide:Router,useValue:routerSpy}],imports:[IonicModule.forRoot(),AngularFireModule.initializeApp(environment.firebaseConfig),AngularFireAuthModule,HttpClientTestingModule]});
    fixture = TestBed.createComponent(ForgotpassPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
    authServiceSpy = TestBed.inject(AngularFireAuth) as jasmine.SpyObj<AngularFireAuth>;
    helperServiceSpy = TestBed.inject(HelperService) as jasmine.SpyObj<HelperService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debe enviar un correo electrónico para restablecer la contraseña y navegar para iniciar sesión en caso de éxito', fakeAsync(() => {
    
    authServiceSpy.sendPasswordResetEmail.and.returnValue(Promise.resolve());

   
    component.recuperarPassword();
    tick(); // Simula el avance del tiempo para que se completen las promesas

   
    expect(authServiceSpy.sendPasswordResetEmail).toHaveBeenCalledWith(component.email);
    expect(helperServiceSpy.showLoader).toHaveBeenCalledWith('Cargando');
    expect(helperServiceSpy.mostrarAlerta).toHaveBeenCalledWith('Debe revisar su correo', 'Información');
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('login');
  }));

  it('debería mostrar una alerta de error si el correo electrónico no es válido', fakeAsync(() => {
   
    const error = { code: 'auth/invalid-email' };
    authServiceSpy.sendPasswordResetEmail.and.rejectWith(error);

  
    component.recuperarPassword();
    tick(); // Simula el avance del tiempo para que se completen las promesas

  
    expect(authServiceSpy.sendPasswordResetEmail).toHaveBeenCalledWith(component.email);
    expect(helperServiceSpy.showLoader).toHaveBeenCalledWith('Cargando');
    expect(helperServiceSpy.mostrarAlerta).toHaveBeenCalledWith('El correo no es el correcto.', 'Error');
    expect(routerSpy.navigateByUrl).not.toHaveBeenCalled(); // No debería navegar a 'login' en caso de error
  }));



});
