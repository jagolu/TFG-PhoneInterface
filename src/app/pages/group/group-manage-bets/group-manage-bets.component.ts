import { Component } from '@angular/core';
import { BetsManager, GroupBet } from 'src/app/models/models';
import { GroupInfoService } from 'src/app/providers/userServices/group-info.service';
import { AlertService } from 'src/app/providers/visualServices/alert.service';
import { GroupService } from 'src/app/providers/restServices/group.service';

@Component({
  selector: 'app-group-manage-bets',
  templateUrl: './group-manage-bets.component.html',
  styleUrls: [],
})
export class GroupManageBetsComponent{

  //
  // ──────────────────────────────────────────────────────────────────────
  //   :::::: C L A S S   V A R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────
  //

  /**
   * The bets launched in the group
   * 
   * @access public
   * @var {BetsManager[]} betsM
   */
  public betsM:BetsManager[];

  /**
   * The name of the actual group
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
   * @param {GroupInfoService} __groupInfoS To get the bets launched
   * @param {AlertSerice} __alertS To launch the alerts
   * @param {GroupService} __groupS To reload the group page
   */
  constructor(
    private __groupInfoS:GroupInfoService, 
    private __alertS:AlertService,
    private __groupS:GroupService
  ) { 
    this.__groupInfoS.info.subscribe(page=>{
      try{
        this.betsM = page.manageBets;
        this._groupName = page.name;
      }
      catch(Error){this.betsM = []}
    });
  }

  
  /**
   * Launchs the alert to see a user football bet
   * 
   * @access public
   * @param {GroupBet} bet The bet which the user want to see 
   * @param {string} betId The id of the bet
   * @param {Boolean} ended True if the bet has ended, false otherwise
   * @param {Boolean} canBetCancelled True if the bet can be cancelled, false otherwise
   */  
  public seeBet(bet:GroupBet, betId:string, ended:Boolean, canBetCancelled:Boolean){
    this.__alertS.seeFootballBet(bet, betId, ended, canBetCancelled);
  }

  /**
   * Launchs the alert to see
   * the form to create a new football
   * bet
   * 
   * @access public
   */
  public createFootballBet(){
    this.__alertS.seeCreateFootballBetForm();
  }

  /**
   * Reload the group page
   * 
   * @access public
   * @param {any} event The reload event 
   */
  public reloadGroup(event:any){
    this.__groupS.getPageGroup(this._groupName);
    event.target.complete();
  }
}