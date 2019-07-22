import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpEvent, HttpInterceptor, HttpHandler, 
        HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AlertInfoType } from '../models/models';
import { LoadingService } from '../providers/visualServices/loading.service';
import { SessionService } from '../providers/userServices/session.service';
import { AuthenticationService } from '../providers/restServices/authentication.service';
import { AlertService } from '../providers/visualServices/alert.service';

@Injectable()
export class SuccessInterceptor implements HttpInterceptor {

    constructor(private alert:AlertService, private loading:LoadingService,
                private _router:Router, private _sessionS:SessionService,
                private _authS:AuthenticationService) { }

    intercept( req: HttpRequest<any>, next: HttpHandler ):Observable<HttpEvent<any>> {
        return next.handle(req).pipe(tap(
            (ok)=>{
                if(ok instanceof HttpResponse) {
                    this.showSuccessAlert(ok);
                    this.loading.stopLoading();
                    this.handleAuthentication(ok);
                    this.successRedirect(ok.url);
                }
            }
        ));
    }

/*----------------------------AUTHENTICATION------------------------------- */

    private handleAuthentication(request:any){
        if(request.body != null && request.body.api_token!=null){
            this._sessionS.setSession({
                "api_token": request.body.api_token,
                "username": request.body.username,
                "role": request.body.role,
                "groups": request.body.groups
            });
        }
        if((request.url.includes("DeleteAccount"))){
            this._authS.logOut();
        }
    }

/*-----------------------------------------ALERTS----------------------------------- */

    private showSuccessAlert(ok){
        if(ok.body && ok.body.success){
            if(ok.body.success == "PassChanged") this.alert.openAlertInfo(AlertInfoType.PASSWORDCHANGED);
            else if(ok.body.success == "SuccesfullBuy") this.alert.openAlertInfo(AlertInfoType.SUCCESFULLBUY);
            else if(ok.body.success == "EnabledGroupPassword") this.alert.openAlertInfo(AlertInfoType.ENABLEDGROUPPASSWORD);
            else if(ok.body.success == "SuccesfullJoinGroup") this.alert.openAlertInfo(AlertInfoType.SUCCESFULLJOINGROUP);
            else if(ok.body.success == "SuccesfullCreatedGroup") this.alert.openAlertInfo(AlertInfoType.SUCCESFULLCREATEDGROUP);
            else if(ok.body.success == "SucessFullPasswordEmail") this.alert.openAlertInfo(AlertInfoType.SUCCESSPASSWORDEMAIL);
            else if(ok.body.success == "SuccesfullGroupRemoved") this.alert.openAlertInfo(AlertInfoType.SUCCESFULLGROUPREMOVED);
            else if(ok.body.success == "SuccesfullGroupLeave") this.alert.openAlertInfo(AlertInfoType.SUCCESFULLGROUPLEAVE);
            else if(ok.body.success == "SuccessfullUserBan") this.alert.openAlertInfo(AlertInfoType.USERSUCCESFULLYBANNED);
            else if(ok.body.success == "SuccessfullUserUnban") this.alert.openAlertInfo(AlertInfoType.USERSUCCESFULLYUNBANNED);
            else if(ok.body.success == "SuccessfullGroupBan") this.alert.openAlertInfo(AlertInfoType.GROUPSUCCESFULLYBANNED);
            else if(ok.body.success == "SuccessfullGroupUnban") this.alert.openAlertInfo(AlertInfoType.GROUPSUCCESFULLYUNBANNED);
        }
        else if(ok.url.includes("Authorization/SignUp")) this.alert.openAlertInfo(AlertInfoType.VERIFICATIONSENT);
        else if(ok.url.includes("User/DeleteAccount")) this.alert.openAlertInfo(AlertInfoType.DELETEDACCOUNT);
        else if(ok.url.includes("Bet/LaunchFootBallBet")) this.alert.openAlertInfo(AlertInfoType.SUCCESFULLFOOTBALLBET);
        else if(ok.url.includes("Bet/DoFootballBet")) this.alert.openAlertInfo(AlertInfoType.SUCCESFULLDOFOOTBALLBET);
        else if(ok.url.includes("Bet/CancelUserFootballBet")) this.alert.openAlertInfo(AlertInfoType.SUCCESFULLCANCELFOOTBALLBET);
        else if(ok.url.includes("DirectMessages/CreateDMTitle")) this.alert.openAlertInfo(AlertInfoType.DMCREATED);
    }

/*------------------------------------ REDIRECT------------------------------ */
    
    private successRedirect(url:string){
        if(url.includes("Authorization/LogIn") || url.includes("Authorization/SocialLog")) this._router.navigate(['']);
        else if(url.includes("User/DeleteAccount")) this._router.navigate(['']);
        else if(url.includes("Authorization/ResetPassword")) this._router.navigate(['logIn']);
        else if(url.includes("Group/RemoveGroup")) this._router.navigate(['']);
        else if(url.includes("Group/LeaveGroup")) this._router.navigate(['']);
    }
}