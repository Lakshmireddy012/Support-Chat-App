import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatTemplateComponent } from './components/chat-template/chat-template.component';
import { LoginComponent } from './components/login/login.component';
import { AngularFireAuthGuard, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';
import { HomeComponent } from './components/home/home.component';
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectAuthorizedToLogin = () => redirectLoggedInTo(['chat']);

const routes: Routes = [
  {path: "chat"  , component: ChatTemplateComponent , canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }},
  {path: "home"  , component: HomeComponent , canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }},
  {path: "login"  , component: LoginComponent , canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectAuthorizedToLogin }},
  {path: ""  , redirectTo: '/login', pathMatch: 'full'},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {


}
