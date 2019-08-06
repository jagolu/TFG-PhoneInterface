import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/providers/userServices/session.service';
import { ChatService } from 'src/app/providers/userServices/Hub/chat.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: [],
})
export class ChatPage {

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
  }
}