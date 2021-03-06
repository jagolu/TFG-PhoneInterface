//Funcionality modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthServiceConfig } from 'angularx-social-login';
import { provideConfig } from 'src/environments/secret';


//Providers
import { ChatService } from './providers/userServices/Hub/chat.service';
import { UserInfoService } from './providers/userServices/user-info.service';
import { SessionService } from './providers/userServices/session.service';
import { UserService } from './providers/restServices/user.service';
import { ShopService } from './providers/restServices/shop.service';
import { HomeService } from './providers/restServices/home.service';
import { GroupService } from './providers/restServices/group.service';
import { BetService } from './providers/restServices/bet.service';
import { AuthenticationService } from './providers/restServices/authentication.service';
import { AliveService } from './providers/restServices/alive.service';
import { AdminService } from './providers/restServices/admin.service';
import { DirectMessagesService } from './providers/restServices/direct-messages.service';
import { NotificationsService } from './providers/userServices/Hub/notifications.service';
import { GroupInfoService } from './providers/userServices/group-info.service';
import { LoadingService } from './providers/visualServices/loading.service';
import { AuthGuardService } from './providers/canActivate/auth-guard.service';
import { ReloadService } from './providers/userServices/reload.service';


// Interceptors
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { HeaderInterceptor } from './interceptors/header.interceptor';
import { SuccessInterceptor } from './interceptors/success.interceptor';


// Main Component
import { AppComponent } from './app.component';


//Pages
import { LogSignModule } from './pages/log-sign/logSign.module';
import { SharedModule } from './pages/shared/shared.module';
import { HomePageModule } from './pages/home/home.module';
import { MainUserGroupsPageModule } from './pages/main-user-groups/main-user-groups.module';
import { GroupPageModule } from './pages/group/group.module';
import { NotificationsPageModule } from './pages/notifications/notifications.module';


//Routes
import { AppRoutingModule } from './app-routing.module';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    LogSignModule,
    HttpClientModule,
    SharedModule,
    HomePageModule,
    MainUserGroupsPageModule,
    GroupPageModule,
    NotificationsPageModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: AuthServiceConfig, useFactory: provideConfig},
    { provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: SuccessInterceptor, multi: true },
    AdminService,
    AliveService,
    AuthenticationService,
    BetService,
    DirectMessagesService,
    GroupService,
    HomeService,
    ShopService,
    UserService,
    GroupInfoService,
    SessionService,
    UserInfoService,
    ChatService,
    NotificationsService,
    LoadingService,
    AuthGuardService,
    ReloadService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
