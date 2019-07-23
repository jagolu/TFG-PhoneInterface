import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { Base64ImagePipe } from 'src/app/pipes/base64-image.pipe';
import { OnlyDatePipe } from 'src/app/pipes/only-date.pipe';
import { UserTabComponent } from './user-tab/user-tab.component';
import { UserInfoPage } from './user-info/user-info.page';
import { UserGroupsPage } from './user-groups/user-groups.page';
import { UserOptionsPage } from './user-options/user-options.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: 'main',
        component: UserTabComponent,
        children:[
          {
            path: 'info',
            component: UserInfoPage
          },
          {
            path: 'options',
            component: UserOptionsPage
          },
          {
            path: 'groups',
            component: UserGroupsPage
          }
        ]
      }
    ])
  ],
  declarations: [UserTabComponent, Base64ImagePipe, OnlyDatePipe, UserInfoPage, UserGroupsPage, UserOptionsPage],
  entryComponents:[UserInfoPage, UserGroupsPage, UserOptionsPage]
})
export class UserPageModule {}
