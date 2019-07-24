import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  { path: 'home', loadChildren: './pages/home/home.module#HomePageModule' },
  { path: 'logSign', loadChildren: './pages/log-sign/logSign.module#LogSignModule'},  { path: 'user', loadChildren: './pages/user/user.module#UserPageModule' },
  { path: 'search-group', loadChildren: './pages/search-group/search-group.module#SearchGroupPageModule' }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
