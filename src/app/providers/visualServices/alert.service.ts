import { Injectable } from '@angular/core';
import { 
  AlertInfoType, AlertMode, GroupMemberAdmin, 
  UserInGroupSearch, GroupMemberOptions, GroupUser, 
  GroupBet, HistoryUserFootballBet 
} from 'src/app/models/models';
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
   * @var {BehaviorSubject<boolean>} __resetForm
   */
  private __resetForm = new BehaviorSubject<boolean>(false);

  /**
   * The filter to reset the form of the alerts
   * at which the other components will subscribe at
   * 
   * @access public
   * @var {Observable} reset
   */
  public reset = this.__resetForm.asObservable();
  
  /**
   * The behaviour to fill the alert with an object info
   * 
   * @access private
   * @var {BehaviorSubject<DoAFootballBet>} objectInfo
   */
  
  /**
   * Says if the alert is launched or not
   * 
   * @access private
   * @var {Boolean} __alertOpened
   */
  private __alertOpened:Boolean = false;

  /**
   * Says if the modal is launched or not
   * 
   * @access private
   * @var {Boolean} __modalOpened
   */
  private __modalOpened:Boolean = false;

  //
  // ──────────────────────────────────────────────────────────────────────────
  //   :::::: C O N S T R U C T O R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────
  //

  /**
   * @constructor
   * @param {AlertController} __alertC To control the ionic alert view
   * @param {ModalController} __modalC To control the ionic modal view
   */
  constructor(private __alertC:AlertController, private __modalC:ModalController) { }


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
    this.__alertC.create({
      header: 'Atención!',
      message: getMessage(AlertType),
      buttons: ['OK']
    }).then(alert => alert.present());
    this.__alertOpened = true;
  }

  /**
   * Open the alert showing the form to create
   * a new group
   * 
   * @access public
   */
  public openCreateGroup(){
    this.prepareAlerts();
    this.__modalC.create({
      component: AlertComponent,
      componentProps:{
        'mode': AlertMode.CREATEGROUP,
        'title': "Crear grupo"
      }
    }).then(modal => modal.present());
    this.__modalOpened = true;
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
    this.__modalC.create({
      component: AlertComponent,
      componentProps:{
        'mode': AlertMode.DELETEACCOUNT,
        'title': "Vas a eliminar tu cuenta de usuario. ¿Estás seguro?",
        "target": email
      }
    }).then(modal => modal.present());
    this.__modalOpened = true;
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
    this.__modalC.create({
      component: AlertComponent,
      componentProps:{
        'mode': AlertMode.DELETEGROUP,
        'title': `Vas a eliminar el grupo ${groupName}. ¿Estás seguro?`,
        "target": groupName
      }
    }).then(modal => modal.present());
    this.__modalOpened = true;
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
    this.__modalC.create({
      component: AlertComponent,
      componentProps:{
        'mode': AlertMode.JOINGROUP,
        'title': `Vas a unirte al grupo "${groupName}"`,
        "target": groupName,
        "needPassword": needPass
      }
    }).then(modal => modal.present());
    this.__modalOpened = true;
  }

  /**
   * Open the alert showing a form to do a
   * user football bet
   * 
   * @param {GroupBet} bet The info of the bet 
   * @param {number} coins The actual coins of the user
   */
  public doAFootballBet(bet:GroupBet, coins:number){
    this.prepareAlerts();
    this.__modalC.create({
      component: AlertComponent,
      componentProps:{
        'mode': AlertMode.FOOTBALLBET,
        'title': bet.betName,
        'object': {
          "bet":bet,
          "userCoins": coins
        }
      }
    }).then(modal => modal.present());
    this.__modalOpened = true;
  }

  /**
   * Open the alert showing the info and button
   * to cancel a user football bet
   * 
   * @param {GroupBet} bet The info of the bet
   * @param {number} user_coins The coins bet by the user
   * @param {string} userFootballBetId The id of the userFootballBet
   */
  public cancelUserFootballBet(bet:GroupBet, user_coins:number, userFootballBetId:string){
    this.prepareAlerts();
    this.__modalC.create({
      component: AlertComponent,
      componentProps:{
        'mode': AlertMode.CANCELUSERFOOTBALLBET,
        'title': "Vas a cancelar tu apuesta!!",
        'target': userFootballBetId,
        'object': {
          "bet":bet,
          "userCoins": user_coins
        }
      }
    }).then(modal => modal.present());
    this.__modalOpened = true;
  }

  /**
   * Open the alert showing the message when a user wants to
   * cancel a football bet
   * 
   * @param {string} betId The id of the football bet
   */
  public cancelFootballBet(betId:string){
    this.prepareAlerts();
    this.__modalC.create({
      component: AlertComponent,
      componentProps:{
        'mode': AlertMode.CANCELFOOTBALLBET,
        'title': `Estas a punto de cancelar el evento de apuesta!`,
        "target": betId
      }
    }).then(modal => modal.present());
    this.__modalOpened = true;
  }

  /**
   * Open the alert showing the groups of an
   * user and their info
   * 
   * @param {UserInGroupSearch[]} groups The info of the groups
   * @param {username} string The username of the user
   */
  public seeUserGroups(groups:UserInGroupSearch[], username:string){
    this.prepareAlerts();
    this.__modalC.create({
      component: AlertComponent,
      componentProps:{
        'mode': AlertMode.SEEUSERGROUPS_ADMIN,
        'title': `Grupos de "${username}"`,
        "object": groups
      }
    }).then(modal => modal.present());
    this.__modalOpened = true;
  }

  /**
   * Open the alert showing the members of an
   * group and their info
   * 
   * @param {GroupMemberAdmin[]} members The info of the members
   * @param {groupName} string The name of the group
   */
  public seeGroupMembers(members:GroupMemberAdmin[], groupName:string){
    this.prepareAlerts();
    this.__modalC.create({
      component: AlertComponent,
      componentProps:{
        'mode': AlertMode.SEEGROUPMEMBERS_ADMIN,
        'title': `Miembros de "${groupName}"`,
        "object": members
      }
    }).then(modal => modal.present());
    this.__modalOpened = true;
  }

  /**
   * Open the alert showing the button options to 
   * a group member
   * 
   * @access public
   * @param {GroupMemberOptions} memberInfo The info of the member
   * @param {string} user_role The role of the actual user
   */
  public seeGroupMemberOptions(memberInfo:GroupMemberOptions, user_role:string){
    this.prepareAlerts();
    this.__modalC.create({
      component: AlertComponent,
      componentProps:{
        'mode': AlertMode.GROUPMEMBEROPTIONS,
        'title': `Opciones de ${memberInfo.user.userName}`,
        'target': user_role,
        "object": memberInfo
      }
    }).then(modal => modal.present());
    this.__modalOpened = true;
  }

  /**
   * Open the alert showing the info of 
   * a group member
   * 
   * @access public
   * @param {GroupUser} member The info of the member
   */
  public seeGroupMemberInfo(member:GroupUser){
    this.prepareAlerts();
    this.__modalC.create({
      component: AlertComponent,
      componentProps:{
        'mode': AlertMode.GROUPMEMBERINFO,
        'title': `Información de ${member.userName}`,
        "object": member
      }
    }).then(modal => modal.present());
    this.__modalOpened = true;
  }

  /**
   * Open the alert showing the info a 
   * football bet
   * 
   * @access public
   * @param {GroupBet} bet The info of the bet
   * @param {string} betId THe id of the bet
   * @param {Boolean} ended True if the bet has ended, false otherwise
   * @param {Boolean} canBeCancelled True if the bet can be cancelled, false otherwise
   */
  public seeFootballBet(bet:GroupBet, betId:string, ended:Boolean, canBeCancelled:Boolean){
    this.prepareAlerts();
    this.__modalC.create({
      component: AlertComponent,
      componentProps:{
        'mode': AlertMode.FOOTBALLBETINFO,
        'title': bet.betName,
        "object": bet,
        "target": betId,
        "needPassword": ended,
        "extraBool": canBeCancelled
      }
    }).then(modal => modal.present());
    this.__modalOpened = true;
  }

  /**
   * Launch the alert to see the user bets in a 
   * football bet
   * 
   * @access public
   * @param {HistoryUserFootballBet[]} userBet The bets of the user
   * @param {GroupBet} footballBet The football bet 
   * @param {Boolean} ended True if the football bet has ended, false otherwise
   * @param {string} name The username of the member of the group who did the bets
   */
  public seeUserBet(userBet:HistoryUserFootballBet[], footballBet:GroupBet, ended:Boolean, name:string){
    this.prepareAlerts();
    this.__modalC.create({
      component: AlertComponent,
      componentProps:{
        'mode': AlertMode.USERFOOTBALLBETINFO,
        'title': name,
        'object':{
          footballBet : footballBet,
          userBet: userBet,
          ended: ended
        }
      }
    }).then(modal => modal.present());
    this.__modalOpened = true;
  }

  /**
   * Launch the alert to see the form to 
   * create a football bet
   * 
   * @access public
   */
  public seeCreateFootballBetForm(){
    this.prepareAlerts();
    this.__modalC.create({
      component: AlertComponent,
      componentProps:{
        'mode': AlertMode.CREATEFOOTBALLBET,
        'title': "Crear un evento de apuesta",
      }
    }).then(modal => modal.present());
    this.__modalOpened = true;
  }
  
  /**
   * Close the alert 
   * 
   * @access public
   */
  public hideAlert(){
    if(this.__modalOpened){
      this.__modalC.dismiss().then(_=> this.__modalC.dismiss()).catch(Error);
      this.__modalOpened = false;
    }
    if(this.__alertOpened){
      this.__alertC.dismiss().then(_=> this.__alertC.dismiss()).catch(Error);
      this.__alertOpened = false;
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
    this.__resetForm.next(true);

    //When all the form will be reseted (aprox 0.5 seconds) change
    // the value to false for not being reseting all the time
    setTimeout(()=>{ this.__resetForm.next(false); }, 500);
  }
}