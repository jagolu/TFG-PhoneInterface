import { Component } from '@angular/core';
import { GroupInfoService } from 'src/app/providers/userServices/group-info.service';
import { NewMessage } from 'src/app/models/models';

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


  //
  // ──────────────────────────────────────────────────────────────────────────
  //   :::::: C O N S T R U C T O R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────
  //

  /**
   * @constructor
   * @param {GroupInfoService} __groupInfoS To get the news of the group page 
   */
  constructor(private __groupInfoS:GroupInfoService) { 
    this.__groupInfoS.info.subscribe(page=>{
      try{this.news = page.news}
      catch(Error){}
    });
  }
}
