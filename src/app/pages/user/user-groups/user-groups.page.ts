import { Component, Input } from '@angular/core';
import { IconModel, Icons } from 'src/app/models/models';
import { SessionService } from 'src/app/providers/userServices/session.service';
import { GroupInfoService } from 'src/app/providers/userServices/group-info.service';
import { Router } from '@angular/router';
import { GroupService } from 'src/app/providers/restServices/group.service';

@Component({
  selector: 'app-user-groups',
  templateUrl: './user-groups.page.html',
  styleUrls: [],
})
export class UserGroupsPage {

  //
  // ──────────────────────────────────────────────────────────────────────
  //   :::::: C L A S S   V A R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────
  //
  
  /**
   * The id of the collapse item (HTML ID)
   * 
   * @access public
   * @var {string} id
   */
  @Input()id:string;

  /**
   * The labelled id (HTML ID)
   * 
   * @access public
   * @var {string} labelled
   */
  @Input()labelled:string;

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
   * @param {GroupService} __groupS To reload the user groups
   */
  constructor(
    private __sessionS:SessionService, 
    private __groupInfoS:GroupInfoService, 
    private __router:Router,
    private __groupS:GroupService
  ) { 
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

  /**
   * Do the refresh request
   * 
   * @access public
   * @param {any} event The refresh event
   */
  public reload(event: any){
    this.__groupS.reloadUserGroups(false).subscribe((groups:string[])=>{
      this.__sessionS.updateGroups(groups);
      event.target.complete();
    });
  }
}