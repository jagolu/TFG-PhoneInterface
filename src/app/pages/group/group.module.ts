import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { GroupTabsComponent } from './group-tabs/group-tabs.component';
import { GroupNewsComponent } from './group-news/group-news.component';
import { GroupNewBetComponent } from './group-new-bet/group-new-bet.component';
import { GroupActiveBetsComponent } from './group-active-bets/group-active-bets.component';
import { GroupMangeBetsComponent } from './group-mange-bets/group-mange-bets.component';
import { GroupHistoryComponent } from './group-history/group-history.component';
import { GroupOptionsComponent } from './group-options/group-options.component';
import { GroupInfoComponent } from './group-info/group-info.component';
import { SharedModule } from '../shared/shared.module';
import { GroupHeaderComponent } from './group-header/group-header.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: 'main',
        component: GroupTabsComponent,
        children:[
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
            path: 'options',
            component: GroupOptionsComponent
          },
          {
            path: 'info',
            component: GroupInfoComponent
          }
        ]
      }
    ])
  ],
  declarations: [
    GroupTabsComponent,
    GroupNewsComponent,
    GroupNewBetComponent,
    GroupActiveBetsComponent,
    GroupMangeBetsComponent,
    GroupHistoryComponent,
    GroupOptionsComponent,
    GroupInfoComponent,
    GroupHeaderComponent
  ],
  entryComponents:[
    GroupNewsComponent,
    GroupNewBetComponent,
    GroupActiveBetsComponent,
    GroupMangeBetsComponent,
    GroupHistoryComponent,
    GroupOptionsComponent,
    GroupInfoComponent
  ]
})
export class GroupPageModule {}
