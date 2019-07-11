import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonApp, IonicModule } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
 
import { AppComponent } from '../app.component';
import { ContactusPage } from '../contactus/contactus.page';
 
import { Camera } from '@ionic-native/camera/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: ContactusPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ContactusPage]
})
export class ContactusPageModule {}


/*
@NgModule({
  declarations: [
    AppComponent,
    ContactusPage
  ],
  imports: [
    BrowserModule,
    /*IonicModule.forRoot(AppComponent)
  ],
  bootstrap: [IonApp],
  entryComponents: [
    AppComponent,
    ContactusPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    EmailComposer,
    Camera,
    {provide: ErrorHandler}
  ]
})
export class ContactusPageModule {}

*/