import { Injectable } from '@angular/core';
import { GroupPage, GroupLocate } from 'src/app/models/models';
import { BehaviorSubject } from 'rxjs';
import { GroupTab } from 'src/app/models/models';

@Injectable({
  providedIn: 'root'
})
/**
 * Service to view the group info in all the components
 * like an observable
 * 
 * @class
 */
export class GroupInfoService {

  //
  // ──────────────────────────────────────────────────────────────────────
  //   :::::: C L A S S   V A R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────
  //
  
  /**
   * The behaviour of the group info
   * 
   * @access private
   * @var {BehaviorSubject<UserInfo>} __information
   */
  private __information = new BehaviorSubject<GroupPage>(null);

  /**
   * The info at which the other components will subscribe at
   * 
   * @access public
   * @var {Observable} info
   */
  public info = this.__information.asObservable();

  /**
   * The behaviour of the group location and name
   * 
   * @access private
   * @var {BehaviorSubject<GroupLocate>} __groupLocate
   */
  private __groupLocate = new BehaviorSubject<GroupLocate>({name : "", tab: GroupTab.NEWS});

  /**
   * The info at which the other components will subscribe at
   * 
   * @access public
   * @var {Observable} locate
   */
  public locate = this.__groupLocate.asObservable();


  //
  // ──────────────────────────────────────────────────────────────────────────
  //   :::::: C O N S T R U C T O R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────
  //
  
  /**
   * @constructor
   */
  constructor() { }

  //
  // ──────────────────────────────────────────────────────────────────────────────────
  //   :::::: P U B L I C   F U N C T I O N S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────────────
  //

  /**
   * Update the group info of the service
   * 
   * @access public
   * @param {GroupPage} info The info to update
   */
  public updateInfo(info:GroupPage){
    //Update the group page info which is at info var
    this.__information.next(info);
  }

  /**
   * Cleans the info of the observable
   * 
   * @access public
   */
  public removeInfo(){
    this.__information.next({
      "actualCapacity": 0,
      "myBets":[],
      "manageBets":[],
      "betsHistory": [],
      "bets":[],
      "canPutPassword": false,
      "createDate": "",
      "dateJoin": "",
      "dateRole": "",
      "hasPassword": false,
      "maxCapacity": 0,
      "members": [],
      "name": "",
      "news" : []
    });

    this.__groupLocate.next({name:"", tab: GroupTab.NEWS});
  }

  /**
   * Set the info locate group to the observable
   * 
   * @access public
   * @param {string} name The name of the group
   * @param {GroupTab} tab The tab where the user is redirected
   */
  public setGroup(name:string, tab:GroupTab = GroupTab.NEWS){
    this.__groupLocate.next({
      name: name,
      tab: tab
    });
  }

  /**
   * Changes the tab location of a group
   * 
   * @access public
   * @param {GroupTab} tab The new tab where the user is
   */
  public changeTab(tab:GroupTab){
    let name = this.__groupLocate.value.name;
    this.setGroup(name, tab);
  }
}
