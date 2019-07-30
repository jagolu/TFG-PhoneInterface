import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from './icon/icon.component';
import { AlertComponent } from './alerts/alert.component';
import { CreateGroupAlertComponent } from './alerts/create-group-alert/create-group-alert.component';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { DeleteAccountAlertComponent } from './alerts/delete-account-alert/delete-account-alert.component';
import { JoinPasswordGroupComponent } from './alerts/join-password-group/join-password-group.component';
import { DeleteGroupAlertComponent } from './alerts/delete-group-alert/delete-group-alert.component';
import { SocialSignPasswordComponent } from './alerts/social-sign-password/social-sign-password.component';
import { OnlyDatePipe } from 'src/app/pages/shared/pipes/only-date.pipe';
import { Base64ImagePipe } from 'src/app/pages/shared/pipes/base64-image.pipe';
import { ChatTimePipe } from 'src/app/pages/shared/pipes/chat-time.pipe';
import { SeeGroupMembersAdminComponent } from './alerts/see-group-members-admin/see-group-members-admin.component';
import { SeeUserGroupsAdminComponent } from './alerts/see-user-groups-admin/see-user-groups-admin.component';
import { NewsViewerComponent } from './news-viewer/news-viewer.component';
import { GroupMemberOptionsComponent } from './alerts/group-member-options/group-member-options.component';
import { GroupMemberInfoComponent } from './alerts/group-member-info/group-member-info.component';
import { FootballBetInfoComponent } from './alerts/football-bet-info/football-bet-info.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule
  ],
  declarations: 
  [
    IconComponent, 
    AlertComponent, 
    CreateGroupAlertComponent, 
    DeleteAccountAlertComponent, 
    JoinPasswordGroupComponent,
    DeleteGroupAlertComponent,
    SocialSignPasswordComponent,
    SeeGroupMembersAdminComponent,
    SeeUserGroupsAdminComponent,
    NewsViewerComponent,
    OnlyDatePipe,
    Base64ImagePipe,
    ChatTimePipe,
    GroupMemberOptionsComponent,
    GroupMemberInfoComponent,
    FootballBetInfoComponent
  ],
  exports: 
  [
    IconComponent, 
    AlertComponent, 
    CreateGroupAlertComponent, 
    DeleteAccountAlertComponent, 
    JoinPasswordGroupComponent,
    DeleteGroupAlertComponent,
    SocialSignPasswordComponent,
    SeeGroupMembersAdminComponent,
    SeeUserGroupsAdminComponent,
    NewsViewerComponent,
    OnlyDatePipe,
    Base64ImagePipe,
    ChatTimePipe,
    GroupMemberOptionsComponent,
    GroupMemberInfoComponent,
    FootballBetInfoComponent
  ],
  entryComponents: 
  [
    AlertComponent, 
    CreateGroupAlertComponent, 
    DeleteAccountAlertComponent, 
    JoinPasswordGroupComponent,
    DeleteGroupAlertComponent,
    SocialSignPasswordComponent,
    SeeGroupMembersAdminComponent,
    NewsViewerComponent,
    SeeUserGroupsAdminComponent,
    GroupMemberOptionsComponent,
    GroupMemberInfoComponent,
    FootballBetInfoComponent
  ]
})
export class SharedModule { }
