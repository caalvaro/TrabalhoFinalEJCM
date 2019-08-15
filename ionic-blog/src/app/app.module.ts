import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';

import { AuthService } from './service/auth.service';
import { PostsService } from './service/posts.service';

import { CommentCreationPage } from './pages/comment-creation/comment-creation.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './guards/auth.guard';

@NgModule({
  declarations: [AppComponent, CommentCreationPage],
  entryComponents: [ CommentCreationPage],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, FormsModule, ReactiveFormsModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    PostsService,
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
