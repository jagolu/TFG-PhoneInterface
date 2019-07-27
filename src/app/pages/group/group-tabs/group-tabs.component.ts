import { Component } from '@angular/core';
import { GroupNewsComponent } from '../group-news/group-news.component';
import { GroupNewBetComponent } from '../group-new-bet/group-new-bet.component';
import { GroupActiveBetsComponent } from '../group-active-bets/group-active-bets.component';
import { GroupMangeBetsComponent } from '../group-mange-bets/group-mange-bets.component';
import { GroupHistoryComponent } from '../group-history/group-history.component';
import { GroupMembersComponent } from '../group-members/group-members.component';
import { GroupOptionsComponent } from '../group-options/group-options.component';
import { GroupInfoComponent } from '../group-info/group-info.component';

@Component({
  selector: 'app-group-tabs',
  templateUrl: './group-tabs.component.html',
  styleUrls: [],
})
export class GroupTabsComponent {

  public groupNewsTab = GroupNewsComponent;
  public groupNewBetsTab = GroupNewBetComponent;
  public groupActiveBetsTab = GroupActiveBetsComponent;
  public groupManageBetsTab = GroupMangeBetsComponent;
  public groupHistoryTab = GroupHistoryComponent;
  public groupMembersTab = GroupMembersComponent;
  public groupOptionsTab = GroupOptionsComponent;
  public groupInfoTab = GroupInfoComponent;

  constructor() { }
}