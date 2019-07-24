import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthenticationService } from './providers/restServices/authentication.service';
import { SessionService } from './providers/userServices/session.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit{
  public username = "";

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private _authS:AuthenticationService,
    private _sessioS:SessionService
  ) {
    this.initializeApp();
  }

  ngOnInit(){
    this._sessioS.User.subscribe(u=>{
      try{this.username = u.username}
      catch(Exception){this.username = ""}
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  public isAuthenticated(){
    return this._authS.IsAuthenticated();
  }

  public isAdmin(){
    return this._sessioS.isAdmin();
  }

  public logOut(){
    this._authS.logOut();
  }
}
