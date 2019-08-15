import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  { path: 'home', loadChildren: './pages/home/home.module#HomePageModule' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './pages/register/register.module#RegisterPageModule' },
  { path: 'posting', loadChildren: './pages/posting/posting.module#PostingPageModule', canActivate: [AuthGuard] },
  { path: 'explore', loadChildren: './pages/explore/explore.module#ExplorePageModule' },
  { path: 'profile', loadChildren: './pages/profile/profile.module#ProfilePageModule' },
  { path: 'comment-creation', loadChildren: './pages/comment-creation/comment-creation.module#CommentCreationPageModule' },
  { path: 'edit-profile', loadChildren: './pages/edit-profile/edit-profile.module#EditProfilePageModule', canActivate: [AuthGuard] },
  { path: 'edit-password', loadChildren: './pages/edit-password/edit-password.module#EditPasswordPageModule', canActivate: [AuthGuard] },
  { path: 'forgot-password', loadChildren: './pages/forgot-password/forgot-password.module#ForgotPasswordPageModule' },
  { path: 'card-info', loadChildren: './pages/card-info/card-info.module#CardInfoPageModule' }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
