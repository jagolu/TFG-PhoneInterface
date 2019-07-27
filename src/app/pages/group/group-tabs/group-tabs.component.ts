import { Component } from '@angular/core';
import { GroupNewsComponent } from '../group-news/group-news.component';
import { GroupNewBetComponent } from '../group-new-bet/group-new-bet.component';
import { GroupActiveBetsComponent } from '../group-active-bets/group-active-bets.component';
import { GroupMangeBetsComponent } from '../group-mange-bets/group-mange-bets.component';
import { GroupHistoryComponent } from '../group-history/group-history.component';
import { GroupMembersComponent } from '../group-members/group-members.component';
import { GroupOptionsComponent } from '../group-options/group-options.component';
import { GroupInfoComponent } from '../group-info/group-info.component';
import { ActivatedRoute } from '@angular/router';
import { GroupService } from 'src/app/providers/restServices/group.service';

@Component({
  selector: 'app-group-tabs',
  templateUrl: './group-tabs.component.html',
  styleUrls: [],
})
export class GroupTabsComponent {

  /**
   * @constructor
   * @param {ActivatedRoute} __aR To get the name of group 
   * @param {GroupService} __groupS To do the http request and get the group info
   */
  constructor(private __aR:ActivatedRoute, private __groupS:GroupService) { 
    this.__aR.params.subscribe(param=> this.__groupS.getPageGroup(param.group));
  }
}