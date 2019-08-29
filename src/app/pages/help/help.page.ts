import { Component } from '@angular/core';
import { IconModel, Icons } from 'src/app/models/models';
import { AuthenticationService } from 'src/app/providers/restServices/authentication.service';

@Component({
  selector: 'app-help',
  templateUrl: './help.page.html',
  styleUrls: [],
})
export class HelpPage {

  //
  // ──────────────────────────────────────────────────────────────────────
  //   :::::: C L A S S   V A R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────
  //

  /**
   * The icon of a a crown
   * 
   * @access public
   * @var {IconModel} icon_crown
   */
  public icon_crown:IconModel = Icons.CROWN;
  
  /**
   * The icon of a wizard hat
   * 
   * @access public
   * @var {IconModel} icon_wizard
   */
  public icon_wizard:IconModel = Icons.WIZARD;


  //
  // ──────────────────────────────────────────────────────────────────────────
  //   :::::: C O N S T R U C T O R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────
  //
  
  /**
   * 
   * @param {AuthenticatedService} __authS To know if the user is logged or not
   */
  constructor(private __authS:AuthenticationService) { }


  //
  // ──────────────────────────────────────────────────────────────────────────────────
  //   :::::: P U B L I C   F U N C T I O N S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────────────
  //

  /**
   * Says if the user is authenticated
   * 
   * @access public
   * @returns {Boolean} True if the user is 
   * authenticated, false otherwise
   */
  public isAuthenticated():Boolean{
    return this.__authS.IsAuthenticated();
  }
}
