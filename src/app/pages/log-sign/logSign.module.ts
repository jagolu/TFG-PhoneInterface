import { LogInPage } from './log-in/log-in.page';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { SocialLoginModule } from 'angularx-social-login';
import { SocialButtonComponent } from './social-button/social-button.component';

import { ReactiveFormsModule} from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SocialLoginModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: LogInPage
      }
    ])
  ],
  declarations: [SocialButtonComponent, LogInPage]
})
export class LogSignModule {}