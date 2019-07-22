import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from './icon/icon.component';
import { AlertComponent } from './alerts/alert.component';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule
  ],
  declarations: 
  [
    IconComponent, 
    AlertComponent, 
  ],
  exports: 
  [
    IconComponent, 
    AlertComponent, 
  ],
  entryComponents: 
  [
    AlertComponent, 
  ]
})
export class SharedModule { }
