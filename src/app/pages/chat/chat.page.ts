import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/providers/userServices/session.service';
import { ChatService } from 'src/app/providers/userServices/Hub/chat.service';
import { Router } from '@angular/router';
import { IconModel, Icons } from 'src/app/models/models';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: [],
})
export class ChatPage {

  //
  // ──────────────────────────────────────────────────────────────────────
  //   :::::: C L A S S   V A R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────
  //

  /**
   * The user groups
   * 
   * @access public
   * @var {string[]} groups
   */
  public groups:string[] = [];

  /**
   * The unread messages in each group
   * 
   * @access public
   * @var {[string, number][]} groupNewMessages
   */
  public groupNewMessages:[string,number][] = [];

  /**
   * The total of the unread messages
   * 
   * @access public
   * @var {number} totalNewMessages
   */
  public totalNewMessages:number = 0;

  /**
   * A icon of a ball
   * 
   * @access public
   * @var {IconModel} icon_ball
   */
  public icon_ball:IconModel = Icons.BALL;


  //
  // ──────────────────────────────────────────────────────────────────────────
  //   :::::: C O N S T R U C T O R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────
  //
  
  /**
   * @constructor
   * @param {SessionService} __sessionS To know the actual user groups
   * @param {ChatService} __chatS To know the unread messages
   */
  constructor(private __sessionS:SessionService, private __chatS:ChatService, private __router:Router) { 
    this.__chatS.newMsgs.subscribe(allGroupNotReadMsgs=>{
      this.totalNewMessages = 0;
      allGroupNotReadMsgs.forEach(c=>this.totalNewMessages += c[1]);
    });
    this.__sessionS.User.subscribe(user => {
      try{this.groups = user.groups;}
      catch(Error){this.groups = []}
    });
    this.__chatS.newMsgs.subscribe(newMsgs=> this.groupNewMessages =  newMsgs);
  }


  //
  // ──────────────────────────────────────────────────────────────────────────────────
  //   :::::: P U B L I C   F U N C T I O N S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────────────
  //

  /**
   * Get the count of the unread messages of an
   * specific group
   * 
   * @access public
   * @param {string} name The name of the group 
   * @return {number} The count of the unread messages
   */
  public getCountMsgs(name:string):number{
    let number = 0;
    this.groupNewMessages.forEach(g=>{
      if(g[0] == name) number = g[1];
    });
    return number;
  }

  /**
   * Change the visualization of the chat to another
   * chat room
   * 
   * @access public
   * @param {string} name The name of the group
   */
  public changeGroupChat(name:string){
    if(!this.groups.some(g=> g == name)) return;
    this.__chatS.changeRoom(name);
    this.__router.navigate(['/chat/chatRoom']);
  }

  /**
   * Get the last message in a chat room
   * 
   * @access public
   * @param {string} name The name of the group
   * @returns {string} The last message of the chat room
   */
  public lastChatMessage(name:string):string{
    return this.__chatS.getLastChatMessage(name);
  }
}