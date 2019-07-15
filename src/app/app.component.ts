import { Component } from '@angular/core';
import { ThemeService } from './theme.service';
import { Storage } from '@ionic/storage';
import { Platform, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { OrganizationService } from './organization.service';
import { BrightspaceService } from './brightspace.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})



export class AppComponent {
  customBackActionSubscription: Subscription;

  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    }
  ];
  classList = [
    {
      Name: '',
      courseID: '',
      icon: ''
    }
  ];
  userFirstName = '';




  constructor(
    private platform: Platform,
    private orgService: OrganizationService,
    private splashScreen: SplashScreen,
    private menuCtrl: MenuController,
    private statusBar: StatusBar,
    private theme: ThemeService,
    private storage: Storage,
    private bService: BrightspaceService) {
    storage.get('theme').then(isDark => {this.theme.setTheme(theme.themes[isDark ? 'dark' : 'default']); });
    bService.validateSession();
    this.bService.userFirstNameSubject.subscribe(() => {
      this.userFirstName = this.bService.userFirstName;
    });
    this.bService.sideMenuSubject.asObservable().subscribe(() => {
      this.classList = this.bService.sideMenuItems;
    });
    this.classList = this.bService.sideMenuItems;
    this.initializeApp();

    }
  initializeApp() {
    this.platform.ready().then(() => {
      // this.statusBar.styleBlackTranslucent();
      if (cordova.platformId === 'android') {
        // this.statusBar.styleBlackOpaque()
      }
      // this.statusBar.backgroundColorByHexString('#33000000');
      // this.splashScreen.hide();
      this.statusBar.overlaysWebView(false);
    });

  }

  logout() {
    this.bService.logout(1);

  }
}
