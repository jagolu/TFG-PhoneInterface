import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { AllConversationsComponent } from './all-conversations/all-conversations.component';
import { SharedModule } from '../shared/shared.module';
import { DirectConversationComponent } from './direct-conversation/direct-conversation.component';



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
        component: AllConversationsComponent
      },
      {
        path: 'directConversation/:id',
        component: DirectConversationComponent
      }
    ])
  ],
  declarations: [AllConversationsComponent, DirectConversationComponent],
  exports: [RouterModule]
})
export class DirectMessagesPageModule {}
