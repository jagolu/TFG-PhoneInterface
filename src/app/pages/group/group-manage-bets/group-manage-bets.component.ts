import { Component } from '@angular/core';
import { BetsManager, GroupBet } from 'src/app/models/models';
import { GroupInfoService } from 'src/app/providers/userServices/group-info.service';
import { AlertService } from 'src/app/providers/visualServices/alert.service';

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


  //
  // ──────────────────────────────────────────────────────────────────────────
  //   :::::: C O N S T R U C T O R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────
  //

  /**
   * @constructor
   * @param {GroupInfoService} __groupInfoS To get the bets launched
   * @param {AlertSerice} __alertS To launch the alerts
   */
  constructor(private __groupInfoS:GroupInfoService, private __alertS:AlertService) { 
    this.__groupInfoS.info.subscribe(page=>{
      try{this.betsM = page.manageBets}
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
}