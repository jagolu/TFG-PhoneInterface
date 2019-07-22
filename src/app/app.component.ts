import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthenticationService } from './providers/restServices/authentication.service';
import { SessionService } from './providers/userServices/session.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Inicio',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Iniciar sesión',
      url: '/logSign/logIn',
      icon: 'person'
    },
    {
      title: 'Registrarse',
      url: '/logSign/signUp',
      icon: 'person-add'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private _authS:AuthenticationService,
    private _sessioS:SessionService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  public show(title:string){
    let isAuth = this._authS.IsAuthenticated();
    if(title=="Iniciar sesión" || title=="Registrarse") return !isAuth;
    else if(title=="Inicio") return true;
    else if(title=="logOut") return isAuth;
    return isAuth;
  }

  public isAdmin(){
    return this._sessioS.isAdmin();
  }

  public logOut(){
    this._authS.logOut();
  }
}
