import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/providers/restServices/user.service';
import { UserInfoService } from 'src/app/providers/userServices/user-info.service';
import { SessionService } from 'src/app/providers/userServices/session.service';
import { UserInfo } from 'src/app/models/models';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.page.html',
  styles: [
    '.img{max-height: 500px; width: auto; padding:0.5em;display: block;margin-left: auto;margin-right: auto;}'
  ],
})
export class UserInfoPage implements OnInit {

  //
  // ──────────────────────────────────────────────────────────────────────
  //   :::::: C L A S S   V A R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────
  //

  /**
   * The info of the actual user
   * 
   * @access public
   * @var {UserInfo} user
   */
  public user:UserInfo;

  /**
   * The email of the actual user
   * 
   * @access public
   * @var {string} email
   */
  public email:string;

  /**
   * The username of the actual user
   * 
   * @access public
   * @var {string} username
   */
  public username:string;

  /**
   * The time when the user joined
   * 
   * @access public
   * @var {string} joinTime
   */
  public joinTime:string;


  //
  // ──────────────────────────────────────────────────────────────────────────
  //   :::::: C O N S T R U C T O R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────
  //
  
  /**
   * @constructor
   * @param {UserService} __userS To get the info of the user
   * @param {UserInfoService} __userInfoS To save the info of the user
   * @param {SessionService} __sessionS To get get the username and know if 
   * he is an admin
   */
  constructor(
    private __userS:UserService, 
    private __userInfoS:UserInfoService, 
    private __sessionS:SessionService
  ){ 
    this.loadPage(null, false);
  }

  /**
   * @OnInit
   */
  ngOnInit(){
    this.__sessionS.User.subscribe(u=>{
      try{this.username = u.username}
      catch(Exception){this.username = ""}
    });

    this.__userInfoS.info.subscribe(info => this.user = info);
  }

  /**
   * Load the use info
   * 
   * @access public
   * @param {any} event The event of refresh
   * @param {Boolean} stopEvent True if this function is
   * called from a refresh event, false if the function is called
   * from the constructor
   */
  public loadPage(event:any, stopEvent:Boolean){
    this.__userS.getUserOptions().subscribe((u:any)=>{
      this.__sessionS.updateGroups(u.groups);
      this.__sessionS.updateUsername(u.nickname);
      this.email = u.email;
      this.joinTime = u.timeSignUp;      
      this.__userInfoS.updateInfo({
        "email": u.email,
        "image": u.img
      });
      if(stopEvent) event.target.complete();
    });
  }


  //
  // ──────────────────────────────────────────────────────────────────────────────────
  //   :::::: P U B L I C   F U N C T I O N S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────────────
  //

  /**
   * To know if the actual user is an admin or not
   * 
   * @access public
   * @returns {Boolean} True if the user is an admin, false otherwise
   */
  public isAdmin(): Boolean{
    return this.__sessionS.isAdmin();
  }
}