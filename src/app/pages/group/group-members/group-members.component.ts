import { Component, OnInit } from '@angular/core';
import { IconModel, Icons, GroupUser } from 'src/app/models/models';
import { GroupService } from 'src/app/providers/restServices/group.service';
import { GroupInfoService } from 'src/app/providers/userServices/group-info.service';
import { AlertService } from 'src/app/providers/visualServices/alert.service';

@Component({
  selector: 'app-group-members',
  templateUrl: './group-members.component.html',
  styleUrls: [],
})
export class GroupMembersComponent implements OnInit {

  //
  // ──────────────────────────────────────────────────────────────────────
  //   :::::: C L A S S   V A R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────
  //

  /**
   * A icon of a crown
   * 
   * @access public
   * @var {IconModel} icon_crown
   */
  public icon_crown:IconModel = Icons.CROWN;

  /**
   * A icon of a wizard hat
   * 
   * @access public
   * @var {IconModel} icon_wizard
   */
  public icon_wizard:IconModel = Icons.WIZARD;

  /**
   * A icon of a cog
   * 
   * @access public
   * @var {IconModel} icon_cog
   */
  public icon_cog:IconModel = Icons.COG;

  /**
   * A icon of a normal user
   * 
   * @access public
   * @var {IconModel} icon_user
   */
  public icon_user:IconModel = Icons.USER;

  /**
   * A icon of a blue i
   * 
   * @access public
   * @var {IconModel} icon_info
   */
  public icon_info:IconModel = Icons.INFO;

  /**
   * A icon of a coin
   * 
   * @access public
   * @var {IconModel} icon_coin
   */
  public icon_coin:IconModel = Icons.COIN;

  /**
   * The members of the group
   * 
   * @access public
   * @var {GroupUser[]} members
   */
  public members:GroupUser[] = [];

  /**
   * The role of the user in the group`
   * 
   * @access public
   * @var {string} user_role
   */
  public user_role:string;

  /**
   * The name of the group
   * 
   * @access private
   * @var {string} _groupName
   */
  private _groupName:string;
  

  //
  // ──────────────────────────────────────────────────────────────────────────
  //   :::::: C O N S T R U C T O R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────
  //

  /**
   * @constructor
   * @param {AlertService} __alertS To launch the alerts
   * @param {GroupInfoService} __groupPage To get the members of the group
   */
  constructor(private __alertS:AlertService, private __groupPage:GroupInfoService) { }

  /**
   * Get the info of the group
   * 
   * @OnInit
   */
  ngOnInit(){
    this.__groupPage.info.subscribe(page=>{
      try{
        this._groupName = page.name;
        this.members = page.members;
        this.user_role = page.members ? page.members[page.members.length-1].role : "";
      }catch(Error){}
    });
  }


  //
  // ──────────────────────────────────────────────────────────────────────────────────
  //   :::::: P U B L I C   F U N C T I O N S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────────────
  //

  /**
   * Launch the group-member-options alert
   * 
   * @access public
   * @param {GroupUser} user The group member to 
   * manage 
   */
  public openOptions(user:GroupUser){
    this.__alertS.seeGroupMemberOptions({
      groupName: this._groupName,
      user: user
    }, this.user_role);
  }

  /**
   * Open the group-member-info alert
   * 
   * @access public
   * @param {GroupUser} user The info of the 
   * group member that the caller want to see
   */
  public openInfo(user:GroupUser){
    this.__alertS.seeGroupMemberInfo(user);
  }
}