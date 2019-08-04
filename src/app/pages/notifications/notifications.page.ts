import { Component } from '@angular/core';
import { NotificationMessage } from 'src/app/models/models';
import { NotificationsService } from 'src/app/providers/userServices/Hub/notifications.service';
import { AliveService } from 'src/app/providers/restServices/alive.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: [],
})
export class NotificationsPage {

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
   * @param {NotificationsService} notS To know the count of unread notifications
   * @param {AliveService} __aliveS To mark as read the notifications
   */
  constructor(private __notS:NotificationsService, private __aliveS:AliveService){
      this.__notS.notifications.subscribe(msgs=> this.notifications = msgs );
  }

  //
  // ──────────────────────────────────────────────────────────────────────────────────
  //   :::::: P U B L I C   F U N C T I O N S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────────────
  //

  /**
   * Mark one notification as "Read" and delete it
   * 
   * @access public
   * @param {NotificationMessage} not The notification to read
   */
  public watchNotification(not:NotificationMessage){
    let index = this.notifications.indexOf(not, 0);
    if(index>-1) this.notifications.splice(index, 1);
    this.__aliveS.readNotification(not.id);
  }

  /**
   * Reads all the notifications
   */
  public readThemAll(){
      this.__aliveS.readAllNotifications();
      this.__notS.readAllNotifications();
  }
}