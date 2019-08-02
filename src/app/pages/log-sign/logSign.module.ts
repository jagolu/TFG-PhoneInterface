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
import { LogGuardService } from 'src/app/providers/canActivate/log-guard.service';


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
        component: LogInPage,
        canActivate: [LogGuardService]
      },
      {
        path: 'signUp',
        component: SignUpPage,
        canActivate: [LogGuardService]
      },
      {
        path: 'rememberPassword',
        component: RememberPasswordPage,
        canActivate: [LogGuardService]
      }
    ])
  ],
  declarations: [SocialButtonComponent, LogInPage, SignUpPage, RememberPasswordPage],
  exports: [RouterModule]
})
export class LogSignModule {}