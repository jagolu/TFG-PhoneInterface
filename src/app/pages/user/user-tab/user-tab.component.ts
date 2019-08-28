import { Component } from '@angular/core';
import { SessionService } from 'src/app/providers/userServices/session.service';

@Component({
  selector: 'app-user-tab',
  templateUrl: './user-tab.component.html',
  styleUrls: [],
})
export class UserTabComponent {

  //
  // ──────────────────────────────────────────────────────────────────────────
  //   :::::: C O N S T R U C T O R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────
  //

  /**
   * @constructor
   * @param {SessionService} __sessionS To know if the user has any groups
   * or is an admin
   */
  constructor(private __sessionS:SessionService) { }


  //
  // ──────────────────────────────────────────────────────────────────────────────────
  //   :::::: P U B L I C   F U N C T I O N S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────────────
  //

  /**
   * Says if the actual user is an admin or not
   * 
   * @access public
   * @returns {Boolean} True if the actual user is
   * and admin, false otherwise
   */
  public isAdmin():Boolean{
    return this.__sessionS.isAdmin();
  }
}
