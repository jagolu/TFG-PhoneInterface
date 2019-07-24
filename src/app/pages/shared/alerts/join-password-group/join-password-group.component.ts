import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertService } from 'src/app/providers/visualServices/alert.service';
import { GroupService } from 'src/app/providers/restServices/group.service';

@Component({
  selector: 'app-join-password-group',
  templateUrl: './join-password-group.component.html',
  styleUrls: [],
})
export class JoinPasswordGroupComponent {

  //
  // ──────────────────────────────────────────────────────────────────────
  //   :::::: C L A S S   V A R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────
  //
  
  /**
   * The form to join the group if it's needed
   * 
   * @access public
   * @var {FormGroup} joinGroupForm
   */
  public joinGroupForm:FormGroup;

  /**
   * The filter to know if it's needed to show the password form
   * 
   * @access public
   * @var {Boolean} hasPassword
   */
  @Input() hasPassword:Boolean;

  /**
   * The name of the group to join in
   * 
   * @access public
   * @var {string} groupName
   */
  @Input() groupName:string;


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
  constructor(private _alertS:AlertService, private _groupS:GroupService) { 
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
   * Do the request to join in the group and close
   * the alert
   * 
   * @access public
   */
  public joinGroup(){
    this._alertS.hideAlert();
    
    setTimeout(this.join.bind(this), 350);
  }


  //
  // ────────────────────────────────────────────────────────────────────────────────────
  //   :::::: P R I V A T E   F U N C T I O N S : :  :   :    :     :        :          :
  // ────────────────────────────────────────────────────────────────────────────────────
  //
  
  /**
   * Initializes the form to join the group
   * 
   * @access private
   */
  private initializeForm(){
    this.joinGroupForm = new FormGroup({
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
  private join(){
    this._groupS.joinGroup({
      "groupName": this.groupName,
      "password": this.joinGroupForm.controls["password"].value
    });
  }

  private resetForm(){
    this.joinGroupForm.reset({"password": ""});
  }
}
