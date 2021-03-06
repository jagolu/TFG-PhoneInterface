import { Component, OnInit } from '@angular/core';
import { EndedFootballBet, HistoryUserFootballBet, GroupBet } from 'src/app/models/models';
import { GroupInfoService } from 'src/app/providers/userServices/group-info.service';
import { AlertService } from 'src/app/providers/visualServices/alert.service';
import { GroupService } from 'src/app/providers/restServices/group.service';

@Component({
  selector: 'app-group-active-bets',
  templateUrl: './group-active-bets.component.html',
  styleUrls: [],
})
export class GroupActiveBetsComponent implements OnInit {

  //
  // ──────────────────────────────────────────────────────────────────────
  //   :::::: C L A S S   V A R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────
  //

  /**
   * The bets done by the user
   * 
   * @access public
   * @var {EndedFootballBet[]} bets
   */
  public bets:EndedFootballBet[];  

  /**
   * The name of the actual group in the page
   * 
   * @access private
   * @param {string} _groupName
   */
  private _groupName:string = "";

  
  //
  // ──────────────────────────────────────────────────────────────────────────
  //   :::::: C O N S T R U C T O R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────
  //

  /**
   * @constructor
   * @param {GroupInfoService} __groupInfoS To get the group active bets 
   * @param {AlertService} __alertS To launch the alerts to see the bet info
   * and the user bets
   * @param {GroupService} __groupS To reload the group page
   */
  constructor(
    private __groupInfoS:GroupInfoService, 
    private __alertS:AlertService,
    private __groupS:GroupService
  ) { }

  /**
   * Get the bets
   * 
   * @OnInit
   */
  ngOnInit() {
    this.__groupInfoS.info.subscribe(page=>{
      try{
        this.bets = page.myBets;
        this._groupName = page.name;
      }
      catch(Error){this.bets = []}
    });
  }


  //
  // ──────────────────────────────────────────────────────────────────────────────────
  //   :::::: P U B L I C   F U N C T I O N S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────────────
  //

  /**
   * Checks if a bet is valir or not
   * 
   * @param {HistoryUserFootballBet[]} myBets The bets done by
   * the user in the football bet
   * @returns {Boolean} True if the bet is valid, false
   * otherwise
   */
  public isValid(myBets:HistoryUserFootballBet[]):Boolean{
    return myBets.some(b => b.valid);
  }

  /**
   * Launchs the alert to see a user football bet
   * 
   * @access public
   * @param {GroupBet} bet The bet which the user want to see 
   */  
  public seeBet(bet:GroupBet){
    this.__alertS.seeFootballBet(bet, "", true, false);
  }

  /**
   * Launchs the alert to see the user bets
   * 
   * @access public
   * @param {EndedFootballBet} bet The user bets of the logged user
   */  
  public seeMyBets(bet:EndedFootballBet){
    this.__alertS.seeUserBet(bet.ownBet, bet.bet, false, "Tus apuestas");
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