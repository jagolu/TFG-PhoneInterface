import { Component } from '@angular/core';
import { IconModel, Icons } from 'src/app/models/models';
import { SessionService } from 'src/app/providers/userServices/session.service';
import { Router } from '@angular/router';
import { GroupInfoService } from 'src/app/providers/userServices/group-info.service';

@Component({
  selector: 'app-main-user-groups',
  templateUrl: './main-user-groups.page.html',
  styleUrls: [],
})
export class MainUserGroupsPage {

  //
  // ──────────────────────────────────────────────────────────────────────
  //   :::::: C L A S S   V A R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────
  //

  /**
   * The groups of the user
   * 
   * @access public
   * @var {string[]} groups
   */
  public groups:string[];

  /**
   * A icon of a ball
   * 
   * @access public
   * @var {IconModel} icon_ball
   */
  public icon_ball:IconModel = Icons.BALL;
  

  //
  // ──────────────────────────────────────────────────────────────────────────
  //   :::::: C O N S T R U C T O R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────
  //

  /**
   * @constructor
   * @param {SessionService} __sessionS To get the groups of the user 
   * @param {GroupInfoService} __groupInfoS To set the group info
   * @param {Router} __router To redirect the user
   */
  constructor(private __sessionS:SessionService, private __groupInfoS:GroupInfoService, private __router:Router) { 
    this.__sessionS.User.subscribe(u=>{
      try{ this.groups = u.groups; }
      catch(Exception){this.groups = [];}
    });
  }


  //
  // ──────────────────────────────────────────────────────────────────────────────────
  //   :::::: P U B L I C   F U N C T I O N S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────────────
  //

  /**
   * Set the group info and redirect the user
   * to its page
   * 
   * @access public
   * @param {string} name The name of the group 
   */
  public goGroup(name:string){
    this.__groupInfoS.setGroup(name);
    this.__router.navigate(['group', name, 'news']);
  }
}