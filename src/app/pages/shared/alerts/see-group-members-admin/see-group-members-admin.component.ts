import { Component, OnInit, Input } from '@angular/core';
import { GroupMemberAdmin, IconModel, Icons } from 'src/app/models/models';

@Component({
  selector: 'app-see-group-members-admin',
  templateUrl: './see-group-members-admin.component.html',
  styleUrls: [],
})
export class SeeGroupMembersAdminComponent {

  //
  // ──────────────────────────────────────────────────────────────────────
  //   :::::: C L A S S   V A R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────
  //
  
  /**
   * The info of the members
   * 
   * @access public
   * @var {GroupMemberAdmin[]} members
   */
  @Input() members:GroupMemberAdmin[] = [];

    
  /**
   * The icon of a a crown
   * 
   * @access public
   * @var {IconModel} icon_crown
   */
  public icon_crown:IconModel = Icons.CROWN;
  
  /**
   * The icon of a wizard hat
   * 
   * @access public
   * @var {IconModel} icon_wizard
   */
  public icon_wizard:IconModel = Icons.WIZARD;

  /**
   * The icon of a coin
   * 
   * @access public
   * @var {IconModel} icon_coin
   */
  public icon_coin:IconModel = Icons.COIN;

  /**
   * The icon of a normal user
   * 
   * @access public
   * @var {IconModel} icon_normal
   */
  public icon_normal:IconModel = Icons.USER;


  //
  // ──────────────────────────────────────────────────────────────────────────
  //   :::::: C O N S T R U C T O R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────
  //
  
  /**
   * @constructor
   */
  constructor() { }
}
