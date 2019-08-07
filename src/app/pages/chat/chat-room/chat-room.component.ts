import { Component, OnInit, ViewChild } from '@angular/core';
import { SessionService } from 'src/app/providers/userServices/session.service';
import { ChatService } from 'src/app/providers/userServices/Hub/chat.service';
import { ChatUserMessages, IconModel, Icons } from 'src/app/models/models';
import { ChatTimePipe } from '../../shared/pipes/chat-time.pipe';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IonContent } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: [],
})
export class ChatRoomComponent implements OnInit {

  //
  // ──────────────────────────────────────────────────────────────────────
  //   :::::: C L A S S   V A R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────
  //


  /**
   * The messages of the actual chat room
   * 
   * @access public
   * @var {ChatUserMessages[]} messages
   */
  public messages:ChatUserMessages[] = [];

  /**
   * The group name of the actual chat room
   * 
   * @access public
   * @var {string} groupName
   */
  public groupName:string = "";

  /**
   * The form to enter a message
   * 
   * @access public
   * @var {FormGroup} sendChatMessageForm
   */
  public sendChatMessageForm:FormGroup;

  /**
   * To do the time transformation
   * 
   * @access private
   * @var {ChatTimePipe} chatTimePipe
   */
  private chatTimePipe = new ChatTimePipe();
  
  /**
   * The icon of a a crown
   * 
   * @access public
   * @var {IconModel} icon_crown
   */
  public icon_crown:IconModel = Icons.CROWN;
  
  /**
   * The icon of a wizard hat
   * 
   * @access public
   * @var {IconModel} icon_wizard
   */
  public icon_wizard:IconModel = Icons.WIZARD;

  /**
   * The nickname of the current user
   * 
   * @access private
   * @var {string} _username
   */
  private _username:string;
  
  /**
   * The window content, to do the scroll down
   * correctly
   * 
   * @access public
   * @var {IonContent} content
   */
  @ViewChild(IonContent) content:IonContent;


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
    this.__chatS.name.subscribe(name => this.groupName = name );
    this.__sessionS.User.subscribe(u =>{
      try{this._username = u.username}
      catch(Error){this._username = ""}
    })
    this.userChatSub();
    this.initializeForm();
    this.__chatS.groupKicked.subscribe(name=>{
      console.log(this.groupName, name);
      if(name == this.groupName){
        this.__router.navigate(['/chat']);
      }
    });
  }

  ngOnInit() {
    setInterval(_=>this.__chatS.readMessagesGroup(this.groupName), 50);
  }


  //
  // ──────────────────────────────────────────────────────────────────────────────────
  //   :::::: P U B L I C   F U N C T I O N S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────────────
  //

  /**
   * Sends a message to the chat socket
   * 
   * @access public
   */
  public send(){
    if(this.sendChatMessageForm.valid){
      this.__chatS.sendMessage({
        "group": this.groupName,
        "message": this.sendChatMessageForm.controls["message"].value,
        "username": this._username,
        "publicUserId": "",
        "role": "",
        "time": new Date()
      })
      
      this.sendChatMessageForm.reset({"message" : ""});
    }
  }

  /**
   * Gets the public user id of the logged user
   * 
   * @access public
   * @returns {string} The public user id
   */
  public getPublicUserid():string{
    return this.__chatS.getPublicUserId();
  }

  /**
   * Gets the chat time to show in the chat window
   * 
   * @access public
   * @param {ChatUserMessages} userMessages The cluster of messages of 
   * for an specific user
   * @param {number} index The index of the message to get the time
   * 
   * @returns {string} If the next message of that user was at the same
   * time that this one returns an empty string, else returns the
   * time date of the message
   */
  public showTime(userMessages:ChatUserMessages, index:number):string{
    let size:number = userMessages.messages.length;
    let nowDate = this.chatTimePipe.transform(userMessages.messages[index].time.toString());
    if(index == size-1) return nowDate;

    let nextDate = this.chatTimePipe.transform(userMessages.messages[index+1].time.toString());
    return nowDate == nextDate ? "" : nowDate;
  }


  //
  // ────────────────────────────────────────────────────────────────────────────────────
  //   :::::: P R I V A T E   F U N C T I O N S : :  :   :    :     :        :          :
  // ────────────────────────────────────────────────────────────────────────────────────
  //

  /**
   * Initializes the form
   * 
   * @access private
   */
  private initializeForm(){
    this.sendChatMessageForm = new FormGroup({
      'message': new FormControl(
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(150)
        ]
      )
    })
  }

  /**
   * Scrolls down the messages screen
   * 
   * @access private
   */
  private scrollDown(){
    setTimeout(_ => this.content.scrollToBottom(400), 300);
  }

  /**
   * Subscribes to the chat messages info and
   * to the scroll down trigger
   * 
   * @access private
   */
  private userChatSub(){
    this.__chatS.room.subscribe(msgs=>{
      this.messages = msgs;
      this.scrollDown();
    });
    this.__chatS.reDown.subscribe((down:[string,boolean])=>{
      if(down[0] == this.groupName && down[1] == true){
        this.scrollDown();
      }
    });
  }
}
