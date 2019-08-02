import { Component, Input } from '@angular/core';
import { GroupMemberOptions } from 'src/app/models/models';
import { GroupService } from 'src/app/providers/restServices/group.service';
import { AlertService } from 'src/app/providers/visualServices/alert.service';

@Component({
  selector: 'app-group-member-options',
  templateUrl: './group-member-options.component.html',
  styles: [`
    .block{background-color:black}
  `]
})
export class GroupMemberOptionsComponent  {

  //
  // ──────────────────────────────────────────────────────────────────────
  //   :::::: C L A S S   V A R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────
  //

  /**
   * Info of the group member
   * 
   * @access public
   * @var {GroupMemberOptions} memberInfo
   */
  @Input() memberInfo:GroupMemberOptions;

  /**
   * The role of the actual member
   * 
   * @access public
   * @var {string} user_role
   */
  @Input() user_role:string ="";


  //
  // ──────────────────────────────────────────────────────────────────────────
  //   :::::: C O N S T R U C T O R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────
  //

  /**
   * @constructor
   * @param {GroupService} groupS To do the group requests 
   * @param {AlertService} _alertS Tohide the alert
   */
  constructor(private groupS:GroupService, private _alertS:AlertService) { }


  // 
  // ──────────────────────────────────────────────────────────────────────────────────
  //   :::::: P U B L I C   F U N C T I O N S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────────────
  //

  /**
   * Give to remove the group admin role to 
   * a member of the group
   * 
   * @access public
   * @param {Boolean} make True to give the role, false to remove it
   */
  public manage(make:Boolean){
    this._alertS.hideAlert();
    this.groupS.makeAdmin({
      "publicid" : this.memberInfo.user.publicUserId,
      "groupName": this.memberInfo.groupName,
      "make_unmake": make
    });
  }

  /**
   * Kicks a user from the group
   * 
   * @access public
   */
  public kick(){
    this._alertS.hideAlert();
    this.groupS.kickUser({
      "groupName": this.memberInfo.groupName,
      "publicId": this.memberInfo.user.publicUserId
    });
  }

  /**
   * Blocks a user from the group
   * 
   * @access public
   * @param {Boolean} block True to block the user, false to unblock him
   */
  public block(block:Boolean){
    this._alertS.hideAlert();
    this.groupS.blockUser({
      "groupName": this.memberInfo.groupName,
      "publicid": this.memberInfo.user.publicUserId,
      "make_unmake": block
    });
  }
}