import { Component, Input } from '@angular/core';
import { UserInGroupSearch, IconModel, Icons } from 'src/app/models/models';

@Component({
  selector: 'app-see-user-groups-admin',
  templateUrl: './see-user-groups-admin.component.html',
  styleUrls: [],
})
export class SeeUserGroupsAdminComponent  {

  //
  // ──────────────────────────────────────────────────────────────────────
  //   :::::: C L A S S   V A R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────
  //
  
  /**
   * The info of the groups
   * 
   * @access public
   * @var {UserInGroupSearch[]} groups
   */
  @Input() groups:UserInGroupSearch[] = [];

    
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
   * The icon of a standar person
   * 
   * @access public
   * @var {IconModel} icon_user
   */
  public icon_user:IconModel = Icons.USER;


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
