import { Component } from '@angular/core';
import { GroupInfoService } from 'src/app/providers/userServices/group-info.service';
import { IconModel, Icons } from 'src/app/models/models';

@Component({
  selector: 'app-group-header',
  templateUrl: './group-header.component.html',
  styleUrls: [],
})
export class GroupHeaderComponent {

  //
  // ──────────────────────────────────────────────────────────────────────
  //   :::::: C L A S S   V A R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────
  //

  /**
   * The name of the group
   * 
   * @access public
   * @var {string} groupName
   */
  public groupName:string ="";

  /**
   * The coins in the group
   * 
   * @access public
   * @var {number} coins
   */
  public coins:number = 0;

  /**
   * A icon of a coin
   * 
   * @access public
   * @var {IconModel} icon_coin
   */
  public icon_coin:IconModel = Icons.COIN;


  //
  // ──────────────────────────────────────────────────────────────────────────
  //   :::::: C O N S T R U C T O R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────
  //

  /**
   * @constructor
   * @param {GroupInfoService} __groupPageS To get the info of the group
   */
  constructor(private __groupPageS:GroupInfoService) { 
    this.__groupPageS.info.subscribe(page=>{
      try{ 
        this.groupName = page.name; 
        this.coins = page.members ? page.members[page.members.length-1].coins : 0;
      }
      catch(Error){}
    });
  }
}
