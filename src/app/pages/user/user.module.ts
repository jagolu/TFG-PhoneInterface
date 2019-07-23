import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { UserPage } from './user.page';
import { Base64ImagePipe } from 'src/app/pipes/base64-image.pipe';
import { OnlyDatePipe } from 'src/app/pipes/only-date.pipe';
import { UserTabComponent } from './user-tab/user-tab.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: 'main',
        component: UserPage
      }
    ])
  ],
  declarations: [UserPage, Base64ImagePipe, OnlyDatePipe, UserTabComponent]
})
export class UserPageModule {}
