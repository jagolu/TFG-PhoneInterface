import { Component } from '@angular/core';
import { UserOptionsPage } from '../user-options/user-options.page';
import { UserGroupsPage } from '../user-groups/user-groups.page';
import { UserInfoPage } from '../user-info/user-info.page';

@Component({
  selector: 'app-user-tab',
  templateUrl: './user-tab.component.html',
  styleUrls: [],
})
export class UserTabComponent {

  public userInfoTab = UserInfoPage;
  public userOptionsTab = UserOptionsPage;
  public userGroupsTab = UserGroupsPage; 

  constructor() { }
}
