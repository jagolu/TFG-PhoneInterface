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

  /**
   * The role of the current user
   * 
   * @access public
   * @var {string} role
   */
  public role:string = "";

  /**
   * The current location tab 
   * 
   * @access private
   * @var {GroupTab} _location
   */
  private _location:GroupTab;


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
    this.__groupInfoS.locate.subscribe(loc=>{
      this._groupName = loc.name;
      this._location = loc.tab;
    });
    this.__groupInfoS.info.subscribe(page=>{
      try{this.role = page.members ? page.members[page.members.length-1].role : "";}
      catch(Error){}
    });
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

  /**
   * Closes the popover
   * 
   * @access public
   */
  public close(){
    this.__popOC.dismiss().then(_=> this.__popOC.dismiss()).catch(Error);
  }

  /**
   * Says if a button can be shown
   * 
   * @access public
   * @param {string} name The name of the button
   * @return {Boolean} True if the button can be shown, false otherwise
   */
  public show(name:string){
    return name.toLowerCase() != this._location.toLowerCase();
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
