import { Component, Input } from '@angular/core';
import { GroupUser, IconModel, Icons } from 'src/app/models/models';

@Component({
  selector: 'app-group-member-info',
  templateUrl: './group-member-info.component.html',  styles: [
    '.img{max-height: 200px; width: auto; padding:0.5em;display: block;margin-left: auto;margin-right: auto;}'
  ],
})
export class GroupMemberInfoComponent{

  //
  // ──────────────────────────────────────────────────────────────────────
  //   :::::: C L A S S   V A R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────
  //

  /**
   * The info of the user
   * 
   * @access public
   * @var {GroupUser} user
   */
  @Input() user:GroupUser;

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

  constructor() { }
}
