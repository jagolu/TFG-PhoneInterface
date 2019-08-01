import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AvailableBet, FootballMatch, NameWinRate, GroupPage, AlertInfoType, LaunchFootballBetManager } from 'src/app/models/models';
import { GroupInfoService } from 'src/app/providers/userServices/group-info.service';
import { BetService } from 'src/app/providers/restServices/bet.service';
import { AlertService } from 'src/app/providers/visualServices/alert.service';

@Component({
  selector: 'app-create-football-bet',
  templateUrl: './create-football-bet.component.html',
  styleUrls: [],
})
export class CreateFootballBetComponent implements OnDestroy, OnInit {
  //
  // ──────────────────────────────────────────────────────────────────────────
  //   :::::: C O N S T R U C T O R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────
  //
  
  /**
   * @constructor
   * @param {GroupInfoService} __groupInfoS For get the available bets info
   * @param {BetService} __betS For launch de bet
   * @param {AlertService} __alertS For show the alert when a user tries to launch
   * a bet with higher minimum bet than his coins
   */
  constructor(private __groupInfoS:GroupInfoService, private __betS:BetService, private __alertS:AlertService) { 
  }

  /**
   * @OnInit
   */
  ngOnInit(){
  }

  /**
   * @OnDestroy
   */
  ngOnDestroy(){
  }
}
