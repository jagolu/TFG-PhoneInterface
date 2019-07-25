import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { AllConversationsComponent } from './all-conversations/all-conversations.component';
import { SharedModule } from '../shared/shared.module';



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
      }
    ])
  ],
  declarations: [AllConversationsComponent],
  exports: [RouterModule]
})
export class DirectMessagesPageModule {}
