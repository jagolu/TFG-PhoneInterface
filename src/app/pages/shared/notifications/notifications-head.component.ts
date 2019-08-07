import { Component } from '@angular/core';
import { NotificationMessage } from 'src/app/models/models';
import { NotificationsService } from 'src/app/providers/userServices/Hub/notifications.service';

@Component({
  selector: 'app-notifications-head',
  templateUrl: './notifications-head.component.html',
  styleUrls: [],
})
export class NotificationsHeadComponent{

  //
  // ──────────────────────────────────────────────────────────────────────
  //   :::::: C L A S S   V A R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────
  //  
  
  /**
   * The notifications that the user have
   * 
   * @access public
   * @var {NotificationMessage[]} notifications
   */
  public notifications:NotificationMessage[] = [];


  //
  // ──────────────────────────────────────────────────────────────────────────
  //   :::::: C O N S T R U C T O R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────
  //
  
  /**
   * @constructor
   * @param {NotificationsService} __notS To get the new incoming notifications
   */
  constructor(private __notS:NotificationsService){
    this.__notS.notifications.subscribe(msgs=> this.notifications = msgs );
  }
}