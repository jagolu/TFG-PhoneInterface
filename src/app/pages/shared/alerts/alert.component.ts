import { Component, Input } from '@angular/core';
import { AlertMode, Icons, IconModel } from 'src/app/models/models';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styles: []
})
/**
 * Class to standard view for all modals
 * 
 * @class
 * @implements AfterViewInit
 */
export class AlertComponent{

  //
  // ──────────────────────────────────────────────────────────────────────
  //   :::::: C L A S S   V A R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────
  //

  /**
   * The mode of the alert to show the
   * correct alert
   * 
   * @access public
   * @var {AlertMode} mode
   */
  @Input() mode:AlertMode;

  /**
   * The title of the alert
   * 
   * @access public
   * @var {string} title
   */
  @Input() title:string;

  /**
   * The target of the alert
   * 
   * @access public
   * @var {string} target
   */
  @Input() target:string;

  /**
   * To know if the form needs password
   * or not
   * 
   * @access public
   * @var {Boolean} needPassword
   */
  @Input() needPassword:Boolean;

  /**
   * Other object that we could need
   * 
   * @access public
   * @var {any} object
   */
  @Input() object:any;

  /**
   * The icon of red cross
   * 
   * @access public
   * @var {IconModel} icon_cross
   */
  public icon_cross:IconModel = Icons.CROSS;

  //
  // ──────────────────────────────────────────────────────────────────────────
  //   :::::: C O N S T R U C T O R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────
  //
  
  /**
   * @constructor
   */
  constructor(private __modalC:ModalController) { }

  public hide(){
    this.__modalC.dismiss();
  }
}