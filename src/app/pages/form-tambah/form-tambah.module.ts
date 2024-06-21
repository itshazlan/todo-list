import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormTambahPageRoutingModule } from './form-tambah-routing.module';

import { FormTambahPage } from './form-tambah.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormTambahPageRoutingModule
  ],
  declarations: [FormTambahPage]
})
export class FormTambahPageModule {}
