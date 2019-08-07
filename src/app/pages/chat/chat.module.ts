import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ChatPage } from './chat.page';
import { SharedModule } from '../shared/shared.module';
import { ChatRoomComponent } from './chat-room/chat-room.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: ChatPage
      },
      {
        path: 'chatRoom',
        component: ChatRoomComponent
      }
    ])
  ],
  declarations: [ChatPage, ChatRoomComponent]
})
export class ChatPageModule {}
