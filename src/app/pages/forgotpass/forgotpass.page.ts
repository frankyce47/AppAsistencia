import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonItem, ToastController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import type { Animation } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { AnimationController, IonCard, IonCardContent } from '@ionic/angular';
import { HelperService } from 'src/app/services/helper.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ModalController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-forgotpass',
  templateUrl: 'forgotpass.page.html',
  styleUrls: ['forgotpass.page.scss'],
})
export class ForgotpassPage {
  email: string = '';

  @ViewChild(IonItem, { read: ElementRef }) item!: ElementRef<HTMLIonItemElement>;
  private animation!: Animation;

  constructor(
            private navCtrl: NavController,
            private alertController: AlertController,
            private animationCtrl: AnimationController,
            private router:Router,
            private helper:HelperService,
            private auth: AngularFireAuth,
            private modalCtrl: ModalController
          ) {}

 
  ngAfterViewInit() {
    this.animation = this.animationCtrl
      .create()
      .addElement(this.item.nativeElement)
      .duration(3000)
      .iterations(Infinity)
      .keyframes([
        { offset: 0, opacity: '1' },
        { offset: 0.72, opacity: '0' },
        { offset: 1, opacity: '1' },
      ]);
  }

  play() {
    this.animation.play();
  }

  pause() {
    this.animation.pause();
  }

  stop() {
    this.animation.stop();
  }

  ngOnInit() {
  }



  async resetearContra(){
    const loader = await this.helper.showLoader("Cargando");
    if (this.email == '') {
      await loader.dismiss();
      this.helper.mostrarAlerta("Debe ingresar un correo." ,"Error");
      return;
    }
    try {
      await this.auth.sendPasswordResetEmail(this.email);
      await this.helper.mostrarAlerta("Debe revisar su correo","Información");
      await loader.dismiss();
      await this.router.navigateByUrl("login");
    } catch (error:any) {
      if (error.code == 'auth/invalid-email') {
        await loader.dismiss();
        await this.helper.mostrarAlerta("El correo no es el correcto.","Error");
      }
    }
  }


  cancelar() {
    return this.modalCtrl.dismiss(null, 'cancelar');
  }






}
