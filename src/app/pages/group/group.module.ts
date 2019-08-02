import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { GroupNewsComponent } from './group-news/group-news.component';
import { GroupNewBetComponent } from './group-new-bet/group-new-bet.component';
import { GroupActiveBetsComponent } from './group-active-bets/group-active-bets.component';
import { GroupManageBetsComponent } from './group-manage-bets/group-manage-bets.component';
import { GroupHistoryComponent } from './group-history/group-history.component';
import { GroupOptionsComponent } from './group-options/group-options.component';
import { GroupInfoComponent } from './group-info/group-info.component';
import { SharedModule } from '../shared/shared.module';
import { GroupHeaderComponent } from './group-header/group-header.component';
import { GroupMembersComponent } from './group-members/group-members.component';
import { GroupPopOverComponent } from './group-pop-over/group-pop-over.component';
import { PasswordFormComponent } from './group-options/password-form/password-form.component';
import { WeeklyPayFormComponent } from './group-options/weekly-pay-form/weekly-pay-form.component';
import { AuthGuardService } from 'src/app/providers/canActivate/auth-guard.service';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: 'news',
        component: GroupNewsComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'newBet',
        component: GroupNewBetComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'activeBets',
        component: GroupActiveBetsComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'manageBets',
        component: GroupManageBetsComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'history',
        component: GroupHistoryComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'members',
        component: GroupMembersComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'options',
        component: GroupOptionsComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'info',
        component: GroupInfoComponent,
        canActivate: [AuthGuardService]
      }
    ])
  ],
  declarations: [
    GroupNewsComponent,
    GroupNewBetComponent,
    GroupActiveBetsComponent,
    GroupManageBetsComponent,
    GroupHistoryComponent,
    GroupOptionsComponent,
    GroupInfoComponent,
    GroupHeaderComponent,
    GroupMembersComponent,
    GroupPopOverComponent,
    PasswordFormComponent,
    WeeklyPayFormComponent
  ],
  entryComponents:[GroupPopOverComponent]
})
export class GroupPageModule {}
