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
import { AuthGuardService } from 'src/app/providers/canActivate/auth-guard.service';


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
            component: UserInfoPage,
            canActivate: [AuthGuardService]
          },
          {
            path: 'options',
            component: UserOptionsPage,
            canActivate: [AuthGuardService]
          },
          {
            path: 'groups',
            component: UserGroupsPage,
            canActivate: [AuthGuardService]
          }
        ]
      }
    ])
  ],
  declarations: [UserTabComponent, UserInfoPage, UserGroupsPage, UserOptionsPage],
  entryComponents:[UserInfoPage, UserGroupsPage, UserOptionsPage]
})
export class UserPageModule {}
