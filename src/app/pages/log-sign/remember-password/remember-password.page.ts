import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/providers/restServices/authentication.service';

@Component({
  selector: 'app-remember-password',
  templateUrl: './remember-password.page.html',
  styleUrls: [],
})
/**
 * Class to show the form of start the process
 * of "Remember password"
 * 
 * @class
 */
export class RememberPasswordPage {

  //
  // ──────────────────────────────────────────────────────────────────────
  //   :::::: C L A S S   V A R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────
  //
  /**
   * The form with the email input
   * 
   * @access public
   * @var {FormGroup} rememberPasswordForm
   */
  public rememberPasswordForm:FormGroup;


  //
  // ──────────────────────────────────────────────────────────────────────────
  //   :::::: C O N S T R U C T O R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────
  //

  /**
   * @constructor
   * @param {AuthenticationService} _authS The service to do the
   * AuthRequests 
   */
  constructor(private _authS:AuthenticationService) { 
    this.rememberPasswordForm = new FormGroup({
      "email": new FormControl(
        '',
        [
          Validators.required,
          Validators.email
        ]
      )
    })
  }


  //
  // ──────────────────────────────────────────────────────────────────────────────────
  //   :::::: P U B L I C   F U N C T I O N S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────────────
  //
  
  /**
   * Do the request with input form email and
   * after that, the form is reseted
   * 
   * @access public
   */
  public rememberPassword(){
    let email = this.rememberPasswordForm.controls["email" ].value;
    this._authS.rememberPassword(email);
    this.rememberPasswordForm.reset({
      "email": ""
    });
  }
}