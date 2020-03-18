import { NgModule } from '@angular/core';
import { FCM } from '@ionic-native/fcm/ngx';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { IonicStorageModule} from '@ionic/storage';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { LoginPage } from './ionicLogin/login/login.page';
import { InterceptorService } from './services/interceptor.service';

import { Base64 } from '@ionic-native/base64/ngx';

import { FilePath } from '@ionic-native/file-path/ngx';
import { FileChooser} from '@ionic-native/file-chooser/ngx';
import { ComponentsModule } from './shared/components/components.module';
import { PapaParseModule } from 'ngx-papaparse';


@NgModule({
  declarations: [
    AppComponent,
    LoginPage
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    IonicStorageModule.forRoot(),
    ComponentsModule,
    PapaParseModule
  ],
  providers: [
    FCM,
    StatusBar,
    SplashScreen,
    FilePath,
    FileChooser,
    Base64,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    ,
    {
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptorService,
    multi: true
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
