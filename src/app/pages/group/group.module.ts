import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { GroupNewsComponent } from './group-news/group-news.component';
import { GroupNewBetComponent } from './group-new-bet/group-new-bet.component';
import { GroupActiveBetsComponent } from './group-active-bets/group-active-bets.component';
import { GroupMangeBetsComponent } from './group-mange-bets/group-mange-bets.component';
import { GroupHistoryComponent } from './group-history/group-history.component';
import { GroupOptionsComponent } from './group-options/group-options.component';
import { GroupInfoComponent } from './group-info/group-info.component';
import { SharedModule } from '../shared/shared.module';
import { GroupHeaderComponent } from './group-header/group-header.component';
import { GroupMembersComponent } from './group-members/group-members.component';
import { GroupPopOverComponent } from './group-pop-over/group-pop-over.component';
import { PasswordFormComponent } from './group-options/password-form/password-form.component';
import { WeeklyPayFormComponent } from './group-options/weekly-pay-form/weekly-pay-form.component';


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
        component: GroupNewsComponent
      },
      {
        path: 'newBet',
        component: GroupNewBetComponent
      },
      {
        path: 'activeBets',
        component: GroupActiveBetsComponent
      },
      {
        path: 'manageBets',
        component: GroupMangeBetsComponent
      },
      {
        path: 'history',
        component: GroupHistoryComponent
      },
      {
        path: 'members',
        component: GroupMembersComponent
      },
      {
        path: 'options',
        component: GroupOptionsComponent
      },
      {
        path: 'info',
        component: GroupInfoComponent
      }
    ])
  ],
  declarations: [
    GroupNewsComponent,
    GroupNewBetComponent,
    GroupActiveBetsComponent,
    GroupMangeBetsComponent,
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
