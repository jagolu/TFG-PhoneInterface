import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './pages/home/home.module#HomePageModule'},
  { path: 'logSign', loadChildren: './pages/log-sign/logSign.module#LogSignModule'},
  { path: 'user', loadChildren: './pages/user/user.module#UserPageModule'},
  { path: 'search-group', loadChildren: './pages/search-group/search-group.module#SearchGroupPageModule'},
  { path: 'search-user', loadChildren: './pages/search-user/search-user.module#SearchUserPageModule'},
  { path: 'direct-messages', loadChildren: './pages/direct-messages/direct-messages.module#DirectMessagesPageModule'},
  { path: 'main-user-groups', loadChildren: './pages/main-user-groups/main-user-groups.module#MainUserGroupsPageModule'},
  { path: 'group/:group', loadChildren: './pages/group/group.module#GroupPageModule'},
  { path: 'notifications', loadChildren: './pages/notifications/notifications.module#NotificationsPageModule' },  { path: 'chat', loadChildren: './pages/chat/chat.module#ChatPageModule' },
  { path: 'help', loadChildren: './pages/help/help.module#HelpPageModule' }



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
