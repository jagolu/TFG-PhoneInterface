import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/providers/restServices/user.service';
import { AlertService } from 'src/app/providers/visualServices/alert.service';

@Component({
  selector: 'app-delete-account-alert',
  templateUrl: './delete-account-alert.component.html',
  styleUrls: [],
})
export class DeleteAccountAlertComponent {

  //
  // ──────────────────────────────────────────────────────────────────────
  //   :::::: C L A S S   V A R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────
  //

  /**
   * The form to delete the account if it's needed
   * 
   * @access public
   * @var {FormGroup} deleteAccountForm
   */
  public deleteAccountForm:FormGroup;

  /**
   * The email of the account which will be deleted
   * 
   * @access public
   * @var {string} email
   */
  @Input() email:string;


  //
  // ──────────────────────────────────────────────────────────────────────────
  //   :::::: C O N S T R U C T O R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────
  //

  /**
   * @constructor
   * @param {AlertService} _alertS To get the alert info
   * @param {UserService} _userS To do the user requests
   */
  constructor(private _alertS:AlertService, private _userS:UserService) {     
    this.initializeForm();
    this._alertS.reset.subscribe(
      reset=>{ if(reset) this.resetForm() }
    );
  }


  //
  // ──────────────────────────────────────────────────────────────────────────────────
  //   :::::: P U B L I C   F U N C T I O N S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────────────
  //

  /**
   * Do the request to remove the user account and 
   * close the alert
   * 
   * @access public
   */
  public deleteAccount(){
    this._alertS.hideAlert();
    
    setTimeout(this.remove.bind(this), 350);
  }


  //
  // ────────────────────────────────────────────────────────────────────────────────────
  //   :::::: P R I V A T E   F U N C T I O N S : :  :   :    :     :        :          :
  // ────────────────────────────────────────────────────────────────────────────────────
  //

  /**
   * Initializes the form to delete the user account
   * 
   * @access private
   */
  private initializeForm(){
    this.deleteAccountForm = new FormGroup({
      'password': new FormControl(
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(30),
          Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
        ]
      )
    });
  }

  /**
   * Do the request to remove the user account
   * 
   * @access private
   */
  private remove(){
    this._userS.deleteUser({
      "email": this.email,
      "password": this.deleteAccountForm.controls["password"].value
    }).subscribe();
  }

  /**
   * Resets the form
   * 
   * @access private
   */
  private resetForm(){
    this.deleteAccountForm.reset({'password': ""});
  }
}
