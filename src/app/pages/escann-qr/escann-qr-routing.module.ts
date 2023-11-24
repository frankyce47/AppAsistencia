import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EscannQrPage } from './escann-qr.page';

const routes: Routes = [
  {
    path: '',
    component: EscannQrPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EscannQrPageRoutingModule {}
