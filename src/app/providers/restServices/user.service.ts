import { Injectable } from '@angular/core';
import { Rest } from './Rest';
import { HttpClient } from '@angular/common/http';
import { ChangeUserInfo, DeleteUser } from 'src/app/models/models';
import { LoadingService } from '../visualServices/loading.service';

@Injectable({
  providedIn: 'root'
})
/**
 * Service to do the user requests
 * 
 * @class
 * @extends Rest
 */
export class UserService extends Rest{

  //
  // ──────────────────────────────────────────────────────────────────────
  //   :::::: C L A S S   V A R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────
  //
  
  /**
   * The path to the user requests
   * 
   * @access private
   * @readonly
   * @var {string} __userPath
   */
  private readonly __userPath : string = "User/";


  //
  // ──────────────────────────────────────────────────────────────────────────
  //   :::::: C O N S T R U C T O R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────
  //
  
  /**
   * @constructor
   * @param {HttpClient} _http For RestService constructor 
   * @param {LoadingService} _loading For RestService constructor 
   */
  constructor(_http:HttpClient, _loading:LoadingService) { 
    super(_http, _loading);
  }


  //
  // ──────────────────────────────────────────────────────────────────────────────────
  //   :::::: P U B L I C   F U N C T I O N S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────────────
  //
  
  /**
   * Function to get the account options of the user
   * 
   * @access public
   * @return {Observable} The result of the request
   */
  public getUserOptions(){
    return this.getRequest(this.__userPath+"UserInfo");
  }

  /**
   * Change the account options of the user
   * 
   * @access public
   * @param {ChangeUserInfo} info The new account options 
   * @return {Observable} The result of the request
   */
  public changeUserInfo(info:ChangeUserInfo){
    return this.postRequest(info,this.__userPath+"ChangeUserInfo");
  }

  /**
   * Delete the user account
   * 
   * @access public
   * @param {DeleteUser} user The user to delete
   * @return {Observable} The result of the request
   */
  public deleteUser(user:DeleteUser){
    return this.postRequest(user, this.__userPath+"DeleteAccount");
  }
}
