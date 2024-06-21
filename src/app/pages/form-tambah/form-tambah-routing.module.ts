import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormTambahPage } from './form-tambah.page';

const routes: Routes = [
  {
    path: '',
    component: FormTambahPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormTambahPageRoutingModule {}
