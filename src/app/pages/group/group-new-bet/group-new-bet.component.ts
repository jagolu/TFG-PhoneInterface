import { Component, OnInit } from '@angular/core';
import { GroupBet } from 'src/app/models/models';
import { GroupInfoService } from 'src/app/providers/userServices/group-info.service';
import { AlertService } from 'src/app/providers/visualServices/alert.service';

@Component({
  selector: 'app-group-new-bet',
  templateUrl: './group-new-bet.component.html',
  styleUrls: [],
})
export class GroupNewBetComponent implements OnInit {

  //
  // ──────────────────────────────────────────────────────────────────────
  //   :::::: C L A S S   V A R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────
  //

  /**
   * The new bets in the group
   * 
   * @access public
   * @var {GroupBet[]} bets
   */
  public bets:GroupBet[] = [];

  /**
   * The coins of the actual user
   * 
   * @access public
   * @var {number} userCoins
   */
  public userCoins:number = 0;


  //
  // ──────────────────────────────────────────────────────────────────────────
  //   :::::: C O N S T R U C T O R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────
  //

  /**
   * @constructor
   * @param {GroupInfoService} __groupInfoS To get the info of the group
   * @param {AlertService} __alertS To launch the alerts
   */
  constructor(private __groupInfoS:GroupInfoService, private __alertS:AlertService) { }

  /**
   * Gets the bets from the service
   * 
   * @OnInit
   */
  ngOnInit() {
    this.__groupInfoS.info.subscribe(page=>{
      try{
        this.userCoins =  page.members ? page.members[page.members.length-1].coins : 0;
        this.bets = page.bets;
      }catch(Error){}
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
  }
}
