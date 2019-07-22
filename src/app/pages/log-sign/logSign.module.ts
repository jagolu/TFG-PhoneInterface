import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule} from '@angular/forms';

import { LogInPage } from './log-in/log-in.page';
import { SocialLoginModule } from 'angularx-social-login';
import { SocialButtonComponent } from './social-button/social-button.component';
import { SignUpPage } from './sign-up/sign-up.page';
import { SharedModule } from '../shared/shared.module';
import { RememberPasswordPage } from './remember-password/remember-password.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SocialLoginModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: 'logIn',
        component: LogInPage
      },
      {
        path: 'signUp',
        component: SignUpPage
      },
      {
        path: 'rememberPassword',
        component: RememberPasswordPage
      }
    ])
  ],
  declarations: [SocialButtonComponent, LogInPage, SignUpPage, RememberPasswordPage],
  exports: [RouterModule]
})
export class LogSignModule {}