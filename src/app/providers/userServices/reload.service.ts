import { Injectable, Output } from '@angular/core';
import { ComponentID } from 'src/app/models/models';
import { EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReloadService {

  /**
   * Event emiter to sends the events to 
   * reload the pages
   * 
   * @access public
   * @var {EventEmitter<ComponentID>} reloadComponent
   */
  @Output() reloadComponent: EventEmitter<ComponentID> = new EventEmitter();


  //
  // ──────────────────────────────────────────────────────────────────────────
  //   :::::: C O N S T R U C T O R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────
  //

  /**
   * Sends a none reload
   * 
   * @constructor
   */
  constructor() { 
    this.reloadComponent.emit(ComponentID.NONE);
  }


  //
  // ──────────────────────────────────────────────────────────────────────────────────
  //   :::::: P U B L I C   F U N C T I O N S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────────────
  //

  /**
   * Send the event to reload the home page
   * 
   * @access public
   */
  public reloadHome(){
    this.sendReload(ComponentID.HOME);
  }

  /**
   * Send the event to reload the all
   * conversations page
   * 
   * @access public
   */
  public reloadAllDM(){
    this.sendReload(ComponentID.ALLDM);
  }


  //
  // ────────────────────────────────────────────────────────────────────────────────────
  //   :::::: P R I V A T E   F U N C T I O N S : :  :   :    :     :        :          :
  // ────────────────────────────────────────────────────────────────────────────────────
  //

  /**
   * Send a specific reload event to a
   * specific component
   * 
   * @access private
   * @param {ComponentID} id The id of the component
   */
  private sendReload(id:ComponentID){
    this.reloadComponent.emit(id);
    setTimeout(_=> this.reloadComponent.emit(ComponentID.NONE), 10);
  }
}
