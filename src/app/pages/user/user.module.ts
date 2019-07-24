import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { UserTabComponent } from './user-tab/user-tab.component';
import { UserInfoPage } from './user-info/user-info.page';
import { UserGroupsPage } from './user-groups/user-groups.page';
import { UserOptionsPage } from './user-options/user-options.page';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    SharedModule,
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
  declarations: [UserTabComponent, UserInfoPage, UserGroupsPage, UserOptionsPage],
  entryComponents:[UserInfoPage, UserGroupsPage, UserOptionsPage]
})
export class UserPageModule {}
