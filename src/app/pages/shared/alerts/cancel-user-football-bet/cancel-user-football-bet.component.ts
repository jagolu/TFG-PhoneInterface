import { Component, OnInit, Input } from '@angular/core';
import { AlertService } from 'src/app/providers/visualServices/alert.service';
import { GroupInfoService } from 'src/app/providers/userServices/group-info.service';
import { BetService } from 'src/app/providers/restServices/bet.service';
import { IconModel, Icons, DoAFootballBet } from 'src/app/models/models';
import { MoneyBack } from 'src/app/models/Bets/MoneyBack';

@Component({
  selector: 'app-cancel-user-football-bet',
  templateUrl: './cancel-user-football-bet.component.html',
  styleUrls: [],
})
export class CancelUserFootballBetComponent implements OnInit {

  //
  // ──────────────────────────────────────────────────────────────────────
  //   :::::: C L A S S   V A R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────
  //

  /**
   * A filter know if the bet
   * is a group bet or a solo bet
   * 
   * @access public
   * @var {boolean} jackpotBet
   */
  public jackpotBet:boolean = false;

  /**
   * The coins that the user bet
   * at the begining
   * 
   * @access public
   * @var {number} coins_bet
   */
  public coins_bet:number = 0;

  /**
   * The coins that the user
   * will get back
   * 
   * @access public
   * @var {number} coins_return
   */
  public coins_return:number = 0;

  /**
   * Coin icon
   * 
   * @access public
   * @var {IconModel} coin_icon
   */
  public coin_icon:IconModel = Icons.COIN;

  //
  // ─── VARS TO DO THE REQUEST ─────────────────────────────────────────────────────
  //

  /**
   * The name of the group
   * 
   * @access private
   * @var {string} _groupName 
   */
  private _groupName:string;

  /**
   * The id of the football bet
   * 
   * @access private
   * @var {string} _footballBetId
   */
  private _footballBetId:string;

  /**
   * The id of the user football bet
   * 
   * @access public
   * @var {string} _userFootballBetId
   */

  /**
   * The id of the user football bet
   * 
   * @access public
   * @var {string} userFootballBetId
   */
  @Input() userFootballBetId:string; //Target

  /**
   * The info to fill the alert
   * 
   * @access public
   * @var {DoAFootballBet} info
   */
  @Input() info:DoAFootballBet; //Object


  //
  // ──────────────────────────────────────────────────────────────────────────
  //   :::::: C O N S T R U C T O R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────
  //
  
  /**
   * @constructor
   * @param {AlertService} __alertS To get the alert info
   * @param {BetService} __betS To do the user requests
   * @param {GroupInfoService} __groupInfoS To get the name of the group
   */
  constructor(private __alertS:AlertService, private __groupInfoS:GroupInfoService, private __betS:BetService) { 
    this.__groupInfoS.info.subscribe(group=>this._groupName = group.name);
  }

  /**
   * Manage the info received by the input
   * 
   * @OnInit
   */
  ngOnInit(){
    //Check if the bet is a group bet or a solo bet
    this.jackpotBet = this.info.bet.typePay.name.includes("JACKPOT");
    //The coins that the user did bet at the begining
    this.coins_bet = this.info.userCoins;
    //The id of the bet
    this._footballBetId = this.info.bet.bet;
    //The coins that the user will get back
    this.coins_return = MoneyBack.getMoneyBack(this.info.bet.typeBet.cancelRate, this.info.bet.typePay.cancelRate, this.coins_bet);        
  }


  //
  // ──────────────────────────────────────────────────────────────────────────────────
  //   :::::: P U B L I C   F U N C T I O N S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────────────
  //
  
  /**
   * Do the request to cancel a user football bet &
   * close the alert
   * 
   * @access public
   */
  public cancelBet(){
    this.__alertS.hideAlert();
    //Bootstrap modal close on form submit. So, I have to
    //show 2 modals, so first hide that and in 0.35 seconds
    //send the petition and show the modal of the response
    setTimeout(this.cancelBetReq.bind(this), 350);
  }


  //
  // ────────────────────────────────────────────────────────────────────────────────────
  //   :::::: P R I V A T E   F U N C T I O N S : :  :   :    :     :        :          :
  // ────────────────────────────────────────────────────────────────────────────────────
  //
  
  /**
   * Do the request to do the bet
   * 
   * @access private
   */
  private cancelBetReq(){
    this.__betS.cancelUserFootballBet({
      "groupName": this._groupName,
      "footballBet": this._footballBetId,
      "userBet": this.userFootballBetId,
    });
  }
}