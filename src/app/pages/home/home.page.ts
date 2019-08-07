import { Component } from '@angular/core';
import { NewMessage, ComponentID } from 'src/app/models/models';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HomeService } from 'src/app/providers/restServices/home.service';
import { AuthenticationService } from 'src/app/providers/restServices/authentication.service';
import { SessionService } from 'src/app/providers/userServices/session.service';
import { AdminService } from 'src/app/providers/restServices/admin.service';
import { ReloadService } from 'src/app/providers/userServices/reload.service';

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
   * @var {NewMessage[]} news
   */
  public news: NewMessage[] = [];

  /**
   * The form to launch a New
   * 
   * @access public
   * @var {FormGroup} publishNewForm
   */
  public publishNewForm :FormGroup;

  //
  // ──────────────────────────────────────────────────────────────────────────
  //   :::::: C O N S T R U C T O R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────
  //
  
  /**
   * @constructor
   * @param {HomeService} __homeS To get the news
   * @param {AuthenticationService} __authS To know if the user is authenticated
   * @param {AdminService} __sessionS To know if the user is an admin
   * @param {SessionService} __adminS To launch news
   * @param {ReloadService} __reloadS To get the event to reload the page
   */
  constructor(
    private __homeS:HomeService, 
    private __authS:AuthenticationService, 
    private __sessionS:SessionService, 
    private __adminS: AdminService, 
    private __reloadS:ReloadService
  ) { 
    this.__reloadS.reloadComponent.subscribe(r =>{
      if(r === ComponentID.HOME) this.getNews(null, false);
    });
    this.getNews(null, false);
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
    let message = this.publishNewForm.controls["message"].value;
    this.__adminS.publishNew(message).subscribe((news:any)=>this.news = news);
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

  /**
   * Reload the news
   * 
   * @access public
   * @param {any} event The event of refresh
   * @param {Boolean} stopEvent True if this function is
   * called from a refresh event, false if the function is called
   * from the constructor
   */
  public getNews(event:any, stopEvent:Boolean){
    let isAuth = this.__authS.IsAuthenticated();
    let isAdmin = this.__sessionS.isAdmin();
    this.__homeS.getNews(isAuth && !isAdmin).subscribe((news:any)=>{
      this.news = news;
      if(stopEvent) event.target.complete();
    });
    this.initializeForm();
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
    this.publishNewForm = new FormGroup({
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
    this.publishNewForm.reset({"message": ""});
  }
}