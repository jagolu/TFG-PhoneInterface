import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from './icon/icon.component';
import { AlertComponent } from './alerts/alert.component';
import { CreateGroupAlertComponent } from './alerts/create-group-alert/create-group-alert.component';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { DeleteAccountAlertComponent } from './alerts/delete-account-alert/delete-account-alert.component';
import { JoinPasswordGroupComponent } from './alerts/join-password-group/join-password-group.component';
import { DeleteGroupAlertComponent } from './alerts/delete-group-alert/delete-group-alert.component';

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
    CreateGroupAlertComponent, 
    DeleteAccountAlertComponent, 
    JoinPasswordGroupComponent,
    DeleteGroupAlertComponent
  ],
  exports: 
  [
    IconComponent, 
    AlertComponent, 
    CreateGroupAlertComponent, 
    DeleteAccountAlertComponent, 
    JoinPasswordGroupComponent,
    DeleteGroupAlertComponent
  ],
  entryComponents: 
  [
    AlertComponent, 
    CreateGroupAlertComponent, 
    DeleteAccountAlertComponent, 
    JoinPasswordGroupComponent,
    DeleteGroupAlertComponent
  ]
})
export class SharedModule { }
