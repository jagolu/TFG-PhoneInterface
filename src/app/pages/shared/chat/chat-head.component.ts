import { Component } from '@angular/core';
import { ChatService } from 'src/app/providers/userServices/Hub/chat.service';

@Component({
  selector: 'app-chat-head',
  templateUrl: './chat-head.component.html',
  styleUrls: [],
})
export class ChatHeadComponent{

  //
  // ──────────────────────────────────────────────────────────────────────
  //   :::::: C L A S S   V A R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────
  //  
  
  /**
   * The total of the unread messages
   * 
   * @access public
   * @var {number} totalNewMessages
   */
  public totalNewMessages:number = 0;


  //
  // ──────────────────────────────────────────────────────────────────────────
  //   :::::: C O N S T R U C T O R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────
  //
  
  /**
   * Gets the the unread messages count.
   * Manage the chat log requests.
   * Checks if the user is authenticated
   * 
   * @constructor
   * @param {ChatService} __chatS To get the unread messages
   */
  constructor(private __chatS:ChatService) { 
    this.__chatS.newMsgs.subscribe(allGroupNotReadMsgs=>{
      setTimeout(_=>{
        this.totalNewMessages = 0;
        allGroupNotReadMsgs.forEach(c=>this.totalNewMessages += c[1]);
      }, 1000);
    });
  }
}