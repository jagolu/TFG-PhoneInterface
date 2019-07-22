import { Component, OnInit } from '@angular/core';
import { NewMessage } from 'src/app/models/models';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HomeService } from 'src/app/providers/restServices/home.service';
import { AuthenticationService } from 'src/app/providers/restServices/authentication.service';
import { SessionService } from 'src/app/providers/userServices/session.service';
import { AdminService } from 'src/app/providers/restServices/admin.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: [],
})
export class HomePage {

  //
  // ──────────────────────────────────────────────────────────────────────
  //   :::::: C L A S S   V A R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────
  //
  
  /**
   * The News to show
   * 
   * @access public
   * @var {NewMessage[]} _news
   */
  public _news: NewMessage[] = [];

  /**
   * The form to launch a New
   * 
   * @access public
   * @var {FormGroup} _publishNewForm
   */
  public _publishNewForm :FormGroup;

  //
  // ──────────────────────────────────────────────────────────────────────────
  //   :::::: C O N S T R U C T O R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────
  //
  
  /**
   * @constructor
   * @param {HomeService} __homeS To get the _news
   * @param {AuthenticationService} __authS To know if the user is authenticated
   * @param {AdminService} __sessionS To know if the user is an admin
   * @param {SessionService} __adminS To launch _news
   */
  constructor(private __homeS:HomeService, private __authS:AuthenticationService, 
              private __sessionS:SessionService, private __adminS: AdminService) {
    let isAuth = this.__authS.IsAuthenticated();
    let isAdmin = this.__sessionS.isAdmin();
    this.__homeS.getNews(isAuth && !isAdmin).subscribe((_news:any)=> this._news = _news);
    this.initializeForm();
  }


  //
  // ──────────────────────────────────────────────────────────────────────────────────
  //   :::::: P U B L I C   F U N C T I O N S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────────────
  //

  /**
   * Launchs a new New
   * 
   * @access public
   */
  public launchNew(){
    let message = this._publishNewForm.controls["message"].value;
    this.__adminS.publishNew(message).subscribe((_news:any)=>this._news = _news);
    this.resetForm();
  }

  /**
   * Says if the actual user has
   * the admin role or not
   * 
   * @access public
   * @returns {Boolean} True if 
   * the actual user is an admin, false
   * otherwise
   */
  public isAdmin(): Boolean{
    return this.__sessionS.isAdmin();
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
    this._publishNewForm = new FormGroup({
      "message": new FormControl(
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(250)
        ]
      )
    });
  }

  /**
   * Resets the form
   * 
   * @access private
   */
  private resetForm(){
    this._publishNewForm.reset({"message": ""});
  }
}
