import { Component } from '@angular/core';
import { NotificationMessage, LoginNotification } from 'src/app/models/models';
import { NotificationsService } from 'src/app/providers/userServices/Hub/notifications.service';
import { AliveService } from 'src/app/providers/restServices/alive.service';

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
   * @param {AliveService} __aliveS To get the unread notifications of the user
   * @param {NotificationsService} __notS To get the new incoming notifications
   */
  constructor(private __aliveS:AliveService, private __notS:NotificationsService){
    this.__aliveS.getNotifications().subscribe((n:LoginNotification)=>
        this.__notS.initialize(n.publicUserid, n.messages));

    this.__notS.notifications.subscribe(msgs=> this.notifications = msgs );
  }
}