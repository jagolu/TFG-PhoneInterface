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
   * The behaviour to fill the alert with an object info
   * 
   * @access private
   * @var {BehaviorSubject<DoAFootballBet>} objectInfo
   */
  // private objectInfo = new BehaviorSubject<any>(null);

  /**
   * The data to fill the alerts when they need extra info
   * at which the other components will subscribe at
   * 
   * @access public
   * @var {Observable} reset
   */
  // public oInfo = this.objectInfo.asObservable();
  
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

  /**
   * Open the alert showing the delete account 
   * alert with or without the form
   * 
   * @access public
   * @param {string} email The email of the account
   * to delete
   */
  public deleteAccount(email:string){
    this.prepareAlerts();
    this.modalC.create({
      component: AlertComponent,
      componentProps:{
        'mode': AlertMode.DELETEACCOUNT,
        'title': "Vas a eliminar tu cuenta de usuario. ¿Estás seguro?",
        "target": email
      }
    }).then(modal => modal.present());
    this.modalOpened = true;
  }

  /**
   * Open the alert showing the set a social password form
   * alert 
   * 
   * @access public
   * @param {string} type The type of social log (Facebook or Google)
   */
  public socialPasswordForm(type:string){
    // this.setTitle("Choose a password");
    // // this.changeAlertMode(AlertMode.SOCIALPASSWORD);
    // this.setTarget(type);
    // this.prepareAlerts();

    this.prepareAlerts();
    this.modalC.create({
      component: AlertComponent,
      componentProps:{
        'mode': AlertMode.SOCIALPASSWORD,
        'title': `Establece una contraseña`,
        "target": type
      }
    }).then(modal => modal.present());
    this.modalOpened = true;
  }

  /**
   * Open the alert showing the delete group 
   * alert 
   * 
   * @access public
   * @param {string} GroupName The email of the account
   * to delete
   */
  public deleteGroup(groupName:string){
    this.prepareAlerts();
    this.modalC.create({
      component: AlertComponent,
      componentProps:{
        'mode': AlertMode.DELETEGROUP,
        'title': `Vas a eliminar el grupo ${groupName}. ¿Estás seguro?`,
        "target": groupName
      }
    }).then(modal => modal.present());
    this.modalOpened = true;
  }

  /**
   * Open the alert showing the join group alert
   * with or without the form
   * 
   * @access public
   * @param {boolean} needPass Filter to show the form or not 
   * @param {string} groupName The name of the group to join in
   */
  public joinGroup(needPass:boolean, groupName:string){
    this.prepareAlerts();
    this.modalC.create({
      component: AlertComponent,
      componentProps:{
        'mode': AlertMode.JOINGROUP,
        'title': "Vas a unirte al grupo "+groupName,
        "target": groupName,
        "needPassword": needPass
      }
    }).then(modal => modal.present());
    this.modalOpened = true;
  }

  /**
   * Open the alert showing a form to do a
   * user football bet
   * 
   * @param {GroupBet} bet The info of the bet 
   * @param {number} coins The actual coins of the user
   */
  // public doAFootballBet(bet:GroupBet, coins:number){
  //   this.setTitle(bet.betName);
  //   // this.changeAlertMode(AlertMode.FOOTBALLBET);
  //   this.objectInfo.next({
  //     "bet":bet,
  //     "userCoins": coins
  //   });
  //   this.prepareAlerts();
  // }

  /**
   * Open the alert showing the info and button
   * to cancel a user football bet
   * 
   * @param {GroupBet} bet The info of the bet
   * @param {number} user_coins The coins bet by the user
   * @param {string} userFootballBet The id of the userFootballBet
   */
  // public cancelUserFootballBet(bet:GroupBet, user_coins:number, userFootballBet:string){
  //   this.setTitle("You are going to cancel your bet!");
  //   // this.changeAlertMode(AlertMode.CANCELUSERFOOTBALLBET);
  //   this.objectInfo.next({
  //     "bet":bet,
  //     "userCoins": user_coins
  //   });
  //   this.setTarget(userFootballBet);
  //   this.prepareAlerts();
  // }

  /**
   * Open the alert showing the message when a user wants to
   * cancel a football bet
   * 
   * @param {string} betId The id of the football bet
   */
  // public cancelFootballBet(betId:string){
  //   this.setTitle("Estas a punto de cancelar el evento de apuesta!");
  //   // this.changeAlertMode(AlertMode.CANCELFOOTBALLBET);
  //   this.setTarget(betId);
  //   this.prepareAlerts();
  // }

  /**
   * Open the alert showing the groups of an
   * user and their info
   * 
   * @param {UserInGroupSearch[]} groups The info of the groups
   * @param {username} string The username of the user
   */
  // public seeUserGroups(groups:UserInGroupSearch[], username:string){
  //   this.setTitle(`${username} groups`);
  //   // this.changeAlertMode(AlertMode.SEEUSERGROUPS_ADMIN);
  //   this.objectInfo.next(groups);
  //   this.prepareAlerts();
  // }

  /**
   * Open the alert showing the members of an
   * group and their info
   * 
   * @param {GroupMemberAdmin[]} members The info of the members
   * @param {groupName} string The name of the group
   */
  // public seeGroupMembers(members:GroupMemberAdmin[], groupName:string){
  //   this.setTitle(`${groupName} members`);
  //   // this.changeAlertMode(AlertMode.SEEGROUPMEMBERS_ADMIN);
  //   this.objectInfo.next(members);
  //   this.prepareAlerts();
  // }
  
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