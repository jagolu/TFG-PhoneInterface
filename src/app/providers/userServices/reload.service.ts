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
}
