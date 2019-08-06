import { Component } from '@angular/core';
import { AliveService } from 'src/app/providers/restServices/alive.service';
import { ChatService } from 'src/app/providers/userServices/Hub/chat.service';
import { SessionService } from 'src/app/providers/userServices/session.service';
import { ChatRoomInfo } from 'src/app/models/models';

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
  
  /**
   * Checks if the user is logged in any 
   * chat room
   * 
   * @access public
   * @var {Boolean} thereIsAnyChat
   */
  public thereIsAnyChat:Boolean = false;


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
   * @param {SessionService} __sessionS To get the user groups
   * @param {AliveService} __aliveS To do the log chat request 
   */
  constructor(
    private __chatS:ChatService, 
    private __sessionS:SessionService, 
    private __aliveS:AliveService
  ) { 
    this.__chatS.newMsgs.subscribe(allGroupNotReadMsgs=>{
      this.totalNewMessages = 0;
      allGroupNotReadMsgs.forEach(c=>this.totalNewMessages += c[1]);
    });
    this.__sessionS.User.subscribe(user=> {
      try{
        this.thereIsAnyChat = user.groups.length > 0;
        user.groups.forEach(group=>{
          if(!this.__chatS.alreadyLogged(group)){
            this.__chatS.startLoading(group);
            this.__aliveS.logChat(group).subscribe((info:ChatRoomInfo)=>this.__chatS.addNewGroup(info, user.username));            
          }
        });
      }catch(Error){this.thereIsAnyChat = false}
    });
  }
}