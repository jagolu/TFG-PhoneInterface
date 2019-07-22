import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService, FacebookLoginProvider, GoogleLoginProvider } from 'angularx-social-login';
import { AuthenticationService } from 'src/app/providers/restServices/authentication.service';
import { SocialType } from 'src/app/models/models';

@Component({
  selector: 'app-social-button',
  templateUrl: './social-button.component.html',
  styleUrls: ['./social-button.component.scss']
})
/**
 * Class to show the Google & Facebook buttons
 * and log/sign with them
 * 
 * @class
 */
export class SocialButtonComponent{

  //
  // ──────────────────────────────────────────────────────────────────────
  //   :::::: C L A S S   V A R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────
  //
  
  /**
   * To know if we are in the signUp or LogIn Form
   * 
   * @var {string} path
   */
  private path:string;


  //
  // ──────────────────────────────────────────────────────────────────────────
  //   :::::: C O N S T R U C T O R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────
  //
  
  /**
   * @constructor
   * @param {AlertService} _alert To launch the social password alert if it is necessary
   * @param {AuthenticationService} _authenticationS To do the request to set the password 
   * @param {AuthService} _authS To do the request to Google or Facebook
   * @param {ActivatedRoute} aR To know if we are in the LogIn or SignUp Form
   */
  constructor(/*private _alert:AlertService,*/ private aR:ActivatedRoute,
        private _authS:AuthService, private _authenticationS:AuthenticationService) { 
    this.path = "";
    // this.path = this.aR.snapshot.url[0].path;
  }


  //
  // ──────────────────────────────────────────────────────────────────────────────────
  //   :::::: P U B L I C   F U N C T I O N S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────────────
  //
  
  /**
   * Log or sign a user with Google or Facebook
   * 
   * @param {string} typeS The type of log/sign (Google or Facebook) 
   */
  public socialSignIn(typeS:string){
    let type = typeS == "FACEBOOK" ? SocialType.FACEBOOK : SocialType.GOOGLE
    let providerId = type == SocialType.FACEBOOK ?
      FacebookLoginProvider.PROVIDER_ID : GoogleLoginProvider.PROVIDER_ID;
      
    if(this.path == "signUp"){
      //this._alert.socialPasswordForm(providerId);
    }
    else{
      this._authS.signIn(providerId).then(user=>{
      
        this._authenticationS.logSocialMedia({
          "authToken": type==SocialType.FACEBOOK ? user.authToken : user.idToken,
          "email": user.email,
          "firstName": user.firstName,
          "id": user.id,
          "socialProvider": type,
          "urlImage":user.photoUrl,
          "password": null,
          "provider": true
        });
      })//.catch(_=> this._alert.openAlertInfo(AlertInfoType.SOCIALERROR));
    }
  }
}
