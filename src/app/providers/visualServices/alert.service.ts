import { Injectable } from '@angular/core';
import { AlertInfoType, AlertMode, GroupBet, UserInGroupSearch, GroupMemberAdmin } from 'src/app/models/models';
import { BehaviorSubject } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { getMessage } from './alertInfoMessages';

@Injectable({
  providedIn: 'root'
})
/**
 * Service to manage the alerts
 * 
 * @class
 */
export class AlertService {

  //
  // ──────────────────────────────────────────────────────────────────────────
  //   :::::: C O N S T R U C T O R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────
  //

  /**
   * @constructor
   */
  constructor(public alertC:AlertController) { }


  //
  // ──────────────────────────────────────────────────────────────────────────────────
  //   :::::: P U B L I C   F U N C T I O N S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────────────
  //
  
  /**
   * Open the alert showing an info-alert
   * 
   * @access public
   * @param {AlertInfoType} AlertType The type of 
   * the info alert to show the correct message
   */
  public openAlertInfo(AlertType:AlertInfoType){
    this.alertC.create({
      header: 'Atención!',
      message: getMessage(AlertType),
      buttons: ['OK']
    }).then(alert => alert.present());
  }
  
  /**
   * Close the alert clicking a hide button
   * 
   * @access public
   */
  public hideAlert(){
    this.alertC.dismiss();
  }
