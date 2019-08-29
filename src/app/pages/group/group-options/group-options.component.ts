import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/providers/visualServices/alert.service';
import { GroupInfoService } from 'src/app/providers/userServices/group-info.service';
import { GroupService } from 'src/app/providers/restServices/group.service';

@Component({
  selector: 'app-group-options',
  templateUrl: './group-options.component.html',
  styleUrls: [],
})
export class GroupOptionsComponent implements OnInit {

  //
  // ──────────────────────────────────────────────────────────────────────
  //   :::::: C L A S S   V A R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────
  //

  /**
   * The name of  the group
   * 
   * @access private
   * @var {string} _groupName
   */
  private _groupName:string;


  //
  // ──────────────────────────────────────────────────────────────────────────
  //   :::::: C O N S T R U C T O R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────
  //

  /**
   * @constructor
   * @param {AlertService} __alertS To launch the remove group alert
   * @param {GroupInfoService} __groupInfoS To get the name of the group
   * @param {GroupService} __groupS To reload the group page
   */
  constructor(
    private __alertS:AlertService, 
    private __groupInfoS:GroupInfoService,
    private __groupS:GroupService
  ){}

  /**
   * Gets the name of the group
   * 
   * @OnInit
   */
  ngOnInit(){
    this.__groupInfoS.info.subscribe(page=>{
      try{ this._groupName = page.name; }
      catch(Error){ this._groupName = "" }
    });
  }


  //
  // ──────────────────────────────────────────────────────────────────────────────────
  //   :::::: P U B L I C   F U N C T I O N S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────────────
  //

  /**
   * Launchs the remove group alert
   * 
   * @access public
   */
  public openDeleteGroupAlert(){
    this.__alertS.deleteGroup(this._groupName);
  }

  /**
   * Reload the group page
   * 
   * @access public
   * @param {any} event The reload event 
   */
  public reloadGroup(event:any){
    this.__groupS.getPageGroup(this._groupName);
    event.target.complete();
  }
}
