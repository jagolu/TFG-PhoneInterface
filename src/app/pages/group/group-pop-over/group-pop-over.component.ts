import { Component } from '@angular/core';
import { GroupInfoService } from 'src/app/providers/userServices/group-info.service';
import { GroupTab } from 'src/app/models/models';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-group-pop-over',
  templateUrl: './group-pop-over.component.html',
  styleUrls: [],
})
export class GroupPopOverComponent {

  //
  // ──────────────────────────────────────────────────────────────────────
  //   :::::: C L A S S   V A R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────
  //

  /**
   * The name of the group
   * 
   * @access private
   * @var {string} _groupName
   */
  private _groupName:string = "";


  //
  // ──────────────────────────────────────────────────────────────────────────
  //   :::::: C O N S T R U C T O R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────
  //

  /**
   * @constructor
   * @param {GroupInfoService} __groupInfoS To get the actual tab
   * @param {Router} __router To redirect the user to another tab
   * @param {PopoverController} __popOC To dismiss the popover
   */
  constructor(private __groupInfoS:GroupInfoService, private __router:Router, private __popOC:PopoverController) { 
    this.__groupInfoS.locate.subscribe(loc=>this._groupName = loc.name);
  }


  //
  // ──────────────────────────────────────────────────────────────────────────────────
  //   :::::: P U B L I C   F U N C T I O N S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────────────
  //

  /**
   * Redirects the user to another group tab
   * 
   * @access public
   * @param {string} where The next url tab
   */
  public navigate(where:string){
    let type:GroupTab = this.getGroupLocate(where);
    this.__groupInfoS.changeTab(type);
    this.__router.navigate(['group', this._groupName, where]);
    this.__popOC.dismiss().then(_=> this.__popOC.dismiss()).catch(Error);
  }


  //
  // ────────────────────────────────────────────────────────────────────────────────────
  //   :::::: P R I V A T E   F U N C T I O N S : :  :   :    :     :        :          :
  // ────────────────────────────────────────────────────────────────────────────────────
  //

  /**
   * Get the GroupTab object depending on the url tab
   * 
   * @access private
   * @param {string} where Url tab
   * @returns {GroupTab} The GroupTab object
   */
  private getGroupLocate(where:string):GroupTab{
    let type:GroupTab;

    switch(where){
      case "news":{
        type = GroupTab.NEWS;
        break;
      }
      case "newBet":{
        type = GroupTab.NEW_BETS;
        break;
      }
      case "activeBets":{
        type = GroupTab.ACTIVE_BETS;
        break;
      }
      case "manageBets":{
        type = GroupTab.MANAGE_BETS;
        break;
      }
      case "history":{
        type = GroupTab.HISTORY;
        break;
      }
      case "members":{
        type = GroupTab.MEMBERS;
        break;
      }
      case "options":{
        type = GroupTab.OPTIONS;
        break;
      }
      case "info":{
        type = GroupTab.INFO;
        break;
      }
    }

    return type;
  }
}
