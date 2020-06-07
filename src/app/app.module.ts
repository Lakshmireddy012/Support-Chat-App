import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatTemplateComponent } from './components/chat-template/chat-template.component';
import { LoginComponent } from './components/login/login.component';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { FormsModule  } from '@angular/forms';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';
import { AuthService } from './services/auth.service';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatTemplateComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    FormsModule 
  ],
  providers: [AngularFireAuthGuard,AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
