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

  
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private _authS:AuthenticationService,
    private _sessioS:SessionService,
    private __alertS:AlertService,
    private __router:Router,
    private __reloadS:ReloadService
  ) {
    this.initializeApp();
  }

  ngOnInit(){
    this._sessioS.User.subscribe(user=>{
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
    return this._authS.IsAuthenticated();
  }

  /**
   * Says if the current user is an admin or not
   * 
   * @access public
   * @returns {Boolean} True if the current is
   * an admin, false otherwise
   */
  public isAdmin():Boolean{
    return this._sessioS.isAdmin();
  }

  /**
   * Logs the user out
   * 
   * @access public
   */
  public logOut(){
    this._authS.logOut();
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
