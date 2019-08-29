import { Component } from '@angular/core';
import { GroupInfoService } from 'src/app/providers/userServices/group-info.service';
import { NewMessage } from 'src/app/models/models';
import { GroupService } from 'src/app/providers/restServices/group.service';

@Component({
  selector: 'app-group-news',
  templateUrl: './group-news.component.html',
  styleUrls: [],
})
export class GroupNewsComponent {

  //
  // ──────────────────────────────────────────────────────────────────────
  //   :::::: C L A S S   V A R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────
  //

  /**
   * The group news
   * 
   * @access public
   * @var {NewMessage[]} news
   */
  public news:NewMessage[] = [];

  /**
   * The name of the actual group in the page
   * 
   * @access private
   * @param {string} _groupName
   */
  private _groupName:string = "";


  //
  // ──────────────────────────────────────────────────────────────────────────
  //   :::::: C O N S T R U C T O R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────
  //

  /**
   * @constructor
   * @param {GroupInfoService} __groupInfoS To get the news of the group page 
   * @param {GroupService} __groupS To reload the group page
   */
  constructor(private __groupInfoS:GroupInfoService, private __groupS:GroupService) { 
    this.__groupInfoS.info.subscribe(page=>{
      try{
        this.news = page.news;
        this._groupName = page.name;
      }
      catch(Error){}
    });
  }


  //
  // ──────────────────────────────────────────────────────────────────────────────────
  //   :::::: P U B L I C   F U N C T I O N S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────────────
  //

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
