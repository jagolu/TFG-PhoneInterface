import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { ActivatedRouteSnapshot } from '@angular/router';
import { AuthenticationService } from '../restServices/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class LogGuardService implements CanActivate{
  
  //
  // ──────────────────────────────────────────────────────────────────────
  //   :::::: C L A S S   V A R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────
  //
  
  /**
   * The activated url paths
   * 
   * @access public
   * @var {ActivatedRouteSnapshot[]} path
   */
  public path: ActivatedRouteSnapshot[];

  /**
   * The activated url path
   * 
   * @access public
   * @var {ActivatedRouteSnapshot} route
   */
  public route: ActivatedRouteSnapshot;


  //
  // ──────────────────────────────────────────────────────────────────────────
  //   :::::: C O N S T R U C T O R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────
  //

  /**
   * @constructor
   * @param {AuthenticationService} __authService To know if the user is already logged
   */
  constructor(private __authService:AuthenticationService) { }


  //
  // ──────────────────────────────────────────────────────────────────────────────────
  //   :::::: P U B L I C   F U N C T I O N S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────────────
  //
  
  /**
   * Check if an user can access to a especific uri
   * 
   * @access public
   * @param {ActivatedRouteSnapshot} next The url the user is trying to access
   * @return {Boolean} True if the user is authenticated, false otherwise
   */
  public canActivate(next:ActivatedRouteSnapshot):Boolean{
    return !this.__authService.IsAuthenticated();
  }
}