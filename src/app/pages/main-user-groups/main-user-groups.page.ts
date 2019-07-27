import { Component } from '@angular/core';
import { IconModel, Icons } from 'src/app/models/models';
import { SessionService } from 'src/app/providers/userServices/session.service';

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
   */
  constructor(private __sessionS:SessionService) { 
    this.__sessionS.User.subscribe(u=>{
      try{ this.groups = u.groups; }
      catch(Exception){this.groups = [];}
    });
  }
}