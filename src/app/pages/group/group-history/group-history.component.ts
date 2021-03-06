import { Component, OnInit } from '@angular/core';
import { EndedFootballBet, GroupBet, HistoryUserFootballBet } from 'src/app/models/models';
import { GroupInfoService } from 'src/app/providers/userServices/group-info.service';
import { AlertService } from 'src/app/providers/visualServices/alert.service';
import { GroupService } from 'src/app/providers/restServices/group.service';

@Component({
  selector: 'app-group-history',
  templateUrl: './group-history.component.html',
  styleUrls: [],
})
export class GroupHistoryComponent implements OnInit {

  //
  // ──────────────────────────────────────────────────────────────────────
  //   :::::: C L A S S   V A R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────
  //

  /**
   * The history of bets of the user
   * 
   * @access public
   * @var {EndedFootballBet[]} betsHistory
   */
  public betsHistory:EndedFootballBet[];

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
   * @param {GroupInfoService} __groupInfoS To get the history-bets
   * @param {AlertService} __alertS To launchs the bet info
   * @param {GroupService} groupS To reload the page
   */
  constructor(
    private __groupInfoS:GroupInfoService, 
    private __alertS:AlertService,
    private __groupS:GroupService
  ) { }

  /**
   * Gets the history-bets
   * 
   * @OnInit
   */
  ngOnInit() {
    this.__groupInfoS.info.subscribe(page=>{
      try{ 
        this.betsHistory = page.betsHistory;
        this._groupName = page.name;
      }
      catch(Error){this.betsHistory = []}
    });
  }


  //
  // ──────────────────────────────────────────────────────────────────────────────────
  //   :::::: P U B L I C   F U N C T I O N S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────────────
  //
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
   * Launchs the alert to see the user bets from someone
   * 
   * @access public
   * @param {GroupBet} fb The football bet 
   * @param {HistoryUserFootballBet} bets The user bets  
   * @param {string} name The name of the user
   */
  public seeUserBets(fb:GroupBet, bets:HistoryUserFootballBet[], name:string){
    let alertName = name=="" ? "Tus apuestas" : "Apuestas de "+name;
    this.__alertS.seeUserBet(bets, fb, true, alertName);
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