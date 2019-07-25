import { Component } from '@angular/core';
import { DMTitle, SearchUserDM } from 'src/app/models/models';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { DirectMessagesService } from 'src/app/providers/restServices/direct-messages.service';
import { SessionService } from 'src/app/providers/userServices/session.service';
import { AdminService } from 'src/app/providers/restServices/admin.service';

@Component({
  selector: 'app-all-conversations',
  templateUrl: './all-conversations.component.html',
  styles: [`.closedConv{background-color:#F2F2F2}`]
})
export class AllConversationsComponent  {

  //
  // ──────────────────────────────────────────────────────────────────────
  //   :::::: C L A S S   V A R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────
  //

  /**
   * The direct conversations of the
   * current user
   * 
   * @access public
   * @var {DMTitle[]} dmTitles
   */
  public dmTitles:DMTitle[] = [];

  /**
   * (For admin users) The result user-search
   * 
   * @access public
   * @var {SearchUserDM[]} suggestions
   */
  public suggestions:SearchUserDM[] = [];

  /**
   * The form to create a Direct Conversation
   * 
   * @access public
   * @var {FormGroup} createDMForm
   */
  public createDMForm:FormGroup;

  /**
   * To know if the selected option of 
   * the select-input is valid
   * 
   * @access public
   * @var {Boolean} validSelect
   */
  public validSelect:Boolean = false;


  //
  // ──────────────────────────────────────────────────────────────────────────
  //   :::::: C O N S T R U C T O R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────
  //

  /**
   * Load the direct conversations
   * 
   * @constructor
   * @param {DirectMessagesService} __dmS To do the direct messages requests
   * @param {SessionService} __sessionS To know if the current user is an admin or not
   * @param {AdminService} __adminS To search the users
   */
  constructor(private __dmS:DirectMessagesService, private __sessionS:SessionService, private __adminS:AdminService) { 
    this.__dmS.loadDMTitles().subscribe((dmS:DMTitle[])=> this.dmTitles = dmS);
    this.initializeForm();
    this.validSelect = this.isAdmin() ? false : true;
  }


  //
  // ──────────────────────────────────────────────────────────────────────────────────
  //   :::::: P U B L I C   F U N C T I O N S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────────────
  //

  /**
   * Creates a new direct conversation
   * 
   * @access public
   */
  public createDMTitle(){
    let title = this.createDMForm.controls["title"].value;
    let receiver = this.isAdmin() ? (document.querySelector("#selectSuggsUserIdDMSearch") as HTMLSelectElement).value : null;
    this.__dmS.launchDMTitle({
      "title": title,
      "emailReceiver": receiver
    }).subscribe((dmS:DMTitle[])=> this.dmTitles = dmS);
    this.resetForm();
  }

  /**
   * Checks if the selected option 
   * of the select-input is correct
   * 
   * @access public
   */
  public changeInputSelect(){
    this.validSelect = (document.querySelector("#selectSuggsUserIdDMSearch") as HTMLSelectElement).value!="invalid";
  }

  /**
   * Says if the current user is an admin or not
   * 
   * @access public
   * @returns {Boolean} True if the current user
   * is an admin, false otherwise
   */
  public isAdmin():Boolean{
    return this.__sessionS.isAdmin();
  }

  /**
   * Ajax function to search a user (Only for admins) and
   * change the selected index to 0
   * 
   * @access public
   */
  public findDM(){
    this.changeInputSelect();
    let find = (document.querySelector("#findUserDMId") as HTMLInputElement).value;
    this.__adminS.searchUserDM(find).subscribe((suggs:SearchUserDM[])=>this.suggestions = suggs);
  }


  //
  // ────────────────────────────────────────────────────────────────────────────────────
  //   :::::: P R I V A T E   F U N C T I O N S : :  :   :    :     :        :          :
  // ────────────────────────────────────────────────────────────────────────────────────
  //

  /**
   * Initializes the form to create 
   * a new direct conversation
   * 
   * @access private
   */
  private initializeForm(){
    this.createDMForm = new FormGroup({
      "title": new FormControl(
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(64)
        ]
      )
    });
  }

  /**
   * Resets the form and the select input
   * 
   * @access private
   */
  private resetForm(){
    this.createDMForm.reset({"title": ""});
    (document.querySelector("#findUserDMId") as HTMLInputElement).value = "";
    this.suggestions = [];
  }
}