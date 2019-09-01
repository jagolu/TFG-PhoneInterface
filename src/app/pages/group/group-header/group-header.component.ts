import { Component } from '@angular/core';
import { GroupInfoService } from 'src/app/providers/userServices/group-info.service';
import { IconModel, Icons } from 'src/app/models/models';
import { PopoverController } from '@ionic/angular';
import { GroupPopOverComponent } from '../group-pop-over/group-pop-over.component';
import { GroupService } from 'src/app/providers/restServices/group.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-group-header',
  templateUrl: './group-header.component.html',
  styleUrls: [],
})
export class GroupHeaderComponent {

  //
  // ──────────────────────────────────────────────────────────────────────
  //   :::::: C L A S S   V A R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────
  //

  /**
   * The name of the group
   * 
   * @access public
   * @var {string} groupName
   */
  public groupName:string ="";

  /**
   * The coins in the group
   * 
   * @access public
   * @var {number} coins
   */
  public coins:number = 0;

  /**
   * A icon of a coin
   * 
   * @access public
   * @var {IconModel} icon_coin
   */
  public icon_coin:IconModel = Icons.COIN;

  /**
   * The name of the boton (and the current tab)
   * 
   * @access public
   * @var {string} boton_name
   */
  public boton_name:string ="";


  //
  // ──────────────────────────────────────────────────────────────────────────
  //   :::::: C O N S T R U C T O R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────
  //

  /**
   * @constructor
   * @param {ActivatedRoute} __aR To get the name of group 
   * @param {GroupInfoService} __groupPageS To get the info of the group
   * @param {PopoverController} __popOC To launch the popover nav
   * @param {GroupService} __groupS To do the http request to get the group page info
   */
  constructor(private __aR:ActivatedRoute, private __groupPageS:GroupInfoService, 
              private __popOC:PopoverController, private __groupS:GroupService) {     
    
    this.__groupPageS.info.subscribe(page=>{
      try{ 
        this.groupName = page.name;
        this.coins = page.members ? page.members[page.members.length-1].coins : 0; 
      }
      catch(Error){}
    });
    
    this.__groupPageS.locate.subscribe(locate=> this.boton_name = locate.tab);

    this.__aR.params.subscribe(param=>{
      if(decodeURIComponent(param.group) != this.groupName){
        this.groupName = param.group; 
        this.__groupS.getPageGroup(param.group);
      }
    });
  }
  

  //
  // ──────────────────────────────────────────────────────────────────────────────────
  //   :::::: P U B L I C   F U N C T I O N S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────────────
  //

  /**
   * Launchs the popover nav
   * 
   * @access public
   * @param {Event} ev The event 
   */
  public async popOver(ev){
    const popover = await this.__popOC.create({
      component: GroupPopOverComponent,
      event: ev,
      translucent: true
    });
    return await popover.present();
  }
}
