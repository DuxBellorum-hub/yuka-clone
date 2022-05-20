import { HomePageComponent } from './pages/home-page/home-page.component';
import { ArticleDetailComponent } from './pages/article-detail/article-detail.component';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { CREDENTIALS } from "./firebase.config";
import { DateAgoPipe } from './pipes/date-ago.pipe';

@NgModule({
  declarations: [AppComponent, DateAgoPipe, ArticleDetailComponent, HomePageComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(CREDENTIALS)
  ],
  providers: [
    StatusBar,
    BarcodeScanner,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
