import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthenticationService } from './providers/restServices/authentication.service';
import { SessionService } from './providers/userServices/session.service';
import { AlertService } from './providers/visualServices/alert.service';
import { ReloadService } from './providers/userServices/reload.service';
import { Router, NavigationEnd } from '@angular/router';

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
  private actualUrl:any = null;


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
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private __authS:AuthenticationService,
    private __sessionS:SessionService,
    private __alertS:AlertService,
    private __router:Router,
    private __reloadS:ReloadService
  ) {
    this.initializeApp();
  }

   * Get the user nickname
   * 
   * @OnInit
   */
  ngOnInit(){
    this.__sessionS.User.subscribe(user=>{
      try{this.username = user.username;}
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
  }

  /**
   * Send event to reload the home page
   * 
   * @access public
   */
  public reloadHome(){
    if(this.actualUrl.includes("/home") || this.actualUrl == "/"){
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
      if(activeRoute.urlAfterRedirects && activeRoute.urlAfterRedirects != this.actualUrl) {
        this.actualUrl = activeRoute.urlAfterRedirects;
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

}
