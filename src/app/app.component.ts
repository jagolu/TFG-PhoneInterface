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
  public username = "";
  /**
   * The actual url
   * 
   * @access private
   * @var {any} actualUrl
   */
  private actualUrl:any = null;

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

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  public createGroup(){
    this.__alertS.openCreateGroup();
  }

  public isAuthenticated(){
    return this._authS.IsAuthenticated();
  }

  public isAdmin(){
    return this._sessioS.isAdmin();
  }

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
}
