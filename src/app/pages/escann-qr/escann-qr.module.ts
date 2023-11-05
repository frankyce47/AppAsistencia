import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EscannQrPageRoutingModule } from './escann-qr-routing.module';

import { EscannQrPage } from './escann-qr.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EscannQrPageRoutingModule
  ],
  declarations: [EscannQrPage]
})
export class EscannQrPageModule {}
