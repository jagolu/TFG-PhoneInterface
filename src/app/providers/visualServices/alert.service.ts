import { Injectable } from '@angular/core';
import { AlertInfoType, AlertMode, GroupBet, UserInGroupSearch, GroupMemberAdmin } from 'src/app/models/models';
import { BehaviorSubject } from 'rxjs';
import { AlertController, ModalController } from '@ionic/angular';
import { getMessage } from './alertInfoMessages';
import { AlertComponent } from 'src/app/pages/shared/alerts/alert.component';

@Injectable({
  providedIn: 'root'
})
/**
 * Service to manage the alerts
 * 
 * @class
 */
export class AlertService {

  //
  // ──────────────────────────────────────────────────────────────────────
  //   :::::: C L A S S   V A R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────
  //
  
  /**
   * The behaviour of the trigger to reset the form of the alerts
   * 
   * @access private
   * @var {BehaviorSubject<boolean>} resetForm
   */
  private resetForm = new BehaviorSubject<boolean>(false);

  /**
   * The filter to reset the form of the alerts
   * at which the other components will subscribe at
   * 
   * @access public
   * @var {Observable} reset
   */
  public reset = this.resetForm.asObservable();
  /**
   * Says if the alert is launched or not
   * 
   * @access private
   * @var {Boolean} alertOpened
   */
  private alertOpened:Boolean = false;

  /**
   * Says if the modal is launched or not
   * 
   * @access private
   * @var {Boolean} modalOpened
   */
  private modalOpened:Boolean = false;

  //
  // ──────────────────────────────────────────────────────────────────────────
  //   :::::: C O N S T R U C T O R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────
  //

  /**
   * @constructor
   */
  constructor(private alertC:AlertController, private modalC:ModalController) { }


  //
  // ──────────────────────────────────────────────────────────────────────────────────
  //   :::::: P U B L I C   F U N C T I O N S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────────────
  //
  
  /**
   * Open the alert showing an info-alert
   * 
   * @access public
   * @param {AlertInfoType} AlertType The type of 
   * the info alert to show the correct message
   */
  public openAlertInfo(AlertType:AlertInfoType){
    this.alertC.create({
      header: 'Atención!',
      message: getMessage(AlertType),
      buttons: ['OK']
    }).then(alert => alert.present());
    this.alertOpened = true;
  }

  /**
   * Open the alert showing the form to create
   * a new group
   * 
   * @access public
   */
  public openCreateGroup(){
    this.prepareAlerts();
    this.modalC.create({
      component: AlertComponent,
      componentProps:{
        'mode': AlertMode.CREATEGROUP,
        'title': "Crear grupo"
      }
    }).then(modal => modal.present());
    this.modalOpened = true;
  }
  }
  
  /**
   * Close the alert 
   * 
   * @access public
   */
  public hideAlert(){
    if(this.modalOpened){
      this.modalC.dismiss().then(_=> this.modalC.dismiss()).catch(Error);
      this.modalOpened = false;
    }
    if(this.alertOpened){
      this.alertC.dismiss().then(_=> this.alertC.dismiss()).catch(Error);
      this.alertOpened = false;
    }
  }

  //
  // ────────────────────────────────────────────────────────────────────────────────────
  //   :::::: P R I V A T E   F U N C T I O N S : :  :   :    :     :        :          :
  // ────────────────────────────────────────────────────────────────────────────────────
  //

  /**
   * Open the alert clicking a hide button
   * 
   * @access private
   */
  private prepareAlerts(){
    //First set true the rest form. The components which are
    //subscribed will catch the 'true' and will reset the form.
    this.resetForm.next(true);

    //When all the form will be reseted (aprox 0.5 seconds) change
    // the value to false for not being reseting all the time
    setTimeout(()=>{ this.resetForm.next(false); }, 500);
  }
}