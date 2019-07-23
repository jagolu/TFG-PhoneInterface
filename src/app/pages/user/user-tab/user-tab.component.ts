import { Component, OnInit } from '@angular/core';
import { UserOptionsPage } from '../user-options/user-options.page';
import { UserGroupsPage } from '../user-groups/user-groups.page';
import { UserInfoPage } from '../user-info/user-info.page';
import { SessionService } from 'src/app/providers/userServices/session.service';

@Component({
  selector: 'app-user-tab',
  templateUrl: './user-tab.component.html',
  styleUrls: [],
})
export class UserTabComponent implements OnInit{

  //
  // ──────────────────────────────────────────────────────────────────────
  //   :::::: C L A S S   V A R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────
  //

  /**
   * The user info tab
   * 
   * @access public
   */
  public userInfoTab = UserInfoPage;

  /**
   * The user options tab
   * 
   * @access public
   */
  public userOptionsTab = UserOptionsPage;

  /**
   * The user groups tab
   * 
   * @access public
   */
  public userGroupsTab = UserGroupsPage; 

  /**
   * Says if the actual is joined in any
   * group
   * 
   * @access public
   * @var {Boolean} hasGroups
   */
  public hasGroups:Boolean = false;


  //
  // ──────────────────────────────────────────────────────────────────────────
  //   :::::: C O N S T R U C T O R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────
  //

  /**
   * @constructor
   * @param {SessionService} __sessionS To know if the user has any groups
   * or is an admin
   */
  constructor(private __sessionS:SessionService) { }

  /**
   * @OnInit
   */
  ngOnInit(){
    this.__sessionS.User.subscribe(u=>{
      try{this.hasGroups = u.groups.length > 0}
      catch(Exception){this.hasGroups = false}
    });
  }


  //
  // ──────────────────────────────────────────────────────────────────────────────────
  //   :::::: P U B L I C   F U N C T I O N S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────────────
  //

  /**
   * Says if the actual user is an admin or not
   * 
   * @access public
   * @returns {Boolean} True if the actual user is
   * and admin, false otherwise
   */
  public isAdmin():Boolean{
    return this.__sessionS.isAdmin();
  }
}
