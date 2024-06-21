import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormDetailsPageRoutingModule } from './form-details-routing.module';

import { FormDetailsPage } from './form-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormDetailsPageRoutingModule
  ],
  declarations: [FormDetailsPage]
})
export class FormDetailsPageModule {}
