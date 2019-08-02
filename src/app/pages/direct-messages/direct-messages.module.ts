import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { AllConversationsComponent } from './all-conversations/all-conversations.component';
import { SharedModule } from '../shared/shared.module';
import { DirectConversationComponent } from './direct-conversation/direct-conversation.component';
import { AuthGuardService } from 'src/app/providers/canActivate/auth-guard.service';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: 'allConversations',
        component: AllConversationsComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'directConversation/:id',
        component: DirectConversationComponent,
        canActivate: [AuthGuardService]
      }
    ])
  ],
  declarations: [AllConversationsComponent, DirectConversationComponent],
  exports: [RouterModule]
})
export class DirectMessagesPageModule {}
