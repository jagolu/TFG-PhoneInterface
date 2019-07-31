import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SearchUserPage } from './search-user.page';
import { SharedModule } from '../shared/shared.module';
import { AuthGuardService } from 'src/app/providers/canActivate/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: SearchUserPage,
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SearchUserPage]
})
export class SearchUserPageModule {}
