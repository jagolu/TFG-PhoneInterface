import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthenticationService } from './providers/restServices/authentication.service';
import { SessionService } from './providers/userServices/session.service';
import { AlertService } from './providers/visualServices/alert.service';
import { ReloadService } from './providers/userServices/reload.service';
import { Router, NavigationEnd } from '@angular/router';
import { AliveService } from './providers/restServices/alive.service';
import { LoginNotification } from './models/models';
import { NotificationsService } from './providers/userServices/Hub/notifications.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit{

  //
  // ──────────────────────────────────────────────────────────────────────
  //   :::::: C L A S S   V A R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────
  //

  /**
   * The nickname of the logged user
   * 
   * @access public
   * @var {string} username
   */
  public username = "";

  /**
   * The actual url
   * 
   * @access private
   * @var {any} actualUrl
   */
  private _actualUrl:any = null;
  
  /**
   * Says if the notifications has logged yet
   * 
   * @access private
   * @var {Boolean} _notificationsStarted
   */
  private _notificationsStarted:Boolean = false;

  //
  // ──────────────────────────────────────────────────────────────────────────
  //   :::::: C O N S T R U C T O R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────
  //

  /**
   * Initializes the app
   * 
   * @constructor
   * @param {Platform} platform Needed when the project was created
   * @param {SplashScreen} splashScreen Needed when the project was created
   * @param {StatusBar} statusBar Needed when the project was created
   * @param {AuthenticationService} __authS To know if the current is authenticated or not
   * @param {SessionService} __sessionS To get the username and check if is an admin
   * @param {AlertService} __alertS To launch the create group alert
   * @param {Router} __router To know the actual url
   * @param {ReloadService} __reloadS To send the reload-home event
   * @param {AliveService} __aliveS To log the notifications
   * @param {NotificationsService} __notS To set the notifications
   */
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private __authS:AuthenticationService,
    private __sessionS:SessionService,
    private __alertS:AlertService,
    private __router:Router,
    private __reloadS:ReloadService,
    private __aliveS:AliveService,
    private __notS:NotificationsService
  ) {
    this.initializeApp();
  }

  /**
   * Get the user nickname
   * 
   * @OnInit
   */
  ngOnInit(){
    this.__sessionS.User.subscribe(user=>{
      try{
        this.username = user.username;
        if(!this._notificationsStarted && this.__authS.IsAuthenticated()) this.startNotifications();
      }
      catch(Exception){this.username = ""}
    });
    this.manageUrl();
  }


  //
  // ──────────────────────────────────────────────────────────────────────────────────
  //   :::::: P U B L I C   F U N C T I O N S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────────────
  //

  /**
   * Launchs the alert to create a new group
   * 
   * @access public
   */
  public createGroup(){
    this.__alertS.openCreateGroup();
  }

  /**
   * Says if the actual user is authenticated
   * 
   * @access public
   * @returns {Boolean} True if the actual user
   * is authenticated, false otherwise
   */
  public isAuthenticated():Boolean{
    return this.__authS.IsAuthenticated();
  }

  /**
   * Says if the current user is an admin or not
   * 
   * @access public
   * @returns {Boolean} True if the current is
   * an admin, false otherwise
   */
  public isAdmin():Boolean{
    return this.__sessionS.isAdmin();
  }

  /**
   * Logs the user out
   * 
   * @access public
   */
  public logOut(){
    this.__authS.logOut();
    this.reloadHome();
    this.__router.navigate(['home']);
    this._notificationsStarted = false;
  }

  /**
   * Send event to reload the home page
   * 
   * @access public
   */
  public reloadHome(){
    if(this._actualUrl.includes("/home") || this._actualUrl == "/"){
      this.__reloadS.reloadHome();
    }
  }


  //
  // ────────────────────────────────────────────────────────────────────────────────────
  //   :::::: P R I V A T E   F U N C T I O N S : :  :   :    :     :        :          :
  // ────────────────────────────────────────────────────────────────────────────────────
  //

  /**
   * Subscribe to the routher, to get the actual url
   * 
   * @access private
   */
  private manageUrl(){
    this.__router.events.subscribe( (activeRoute:any)=>{
      if(activeRoute.urlAfterRedirects && activeRoute.urlAfterRedirects != this._actualUrl) {
        this._actualUrl = activeRoute.urlAfterRedirects;
      }
    });
  }
  
  /**
   * Starts the application
   * 
   * @access private
   */
  private initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  /**
   * Logs in the notifications
   * 
   * @access private
   */
  private startNotifications(){
    this.__aliveS.getNotifications().subscribe((n:LoginNotification)=>
        this.__notS.initialize(n.publicUserid, n.messages));
    this._notificationsStarted = true;
  }
}
