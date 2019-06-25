import { Component } from '@angular/core';
import { ThemeService } from './theme.service';
import { Storage } from '@ionic/storage';
import { Platform, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { OrganizationService } from './organization.service';
import { Subscription } from 'rxjs';

const themes = {

  default: {
    primary: '#330572',
    secondary: '#330572',
    tertiary: '#f4f5f8',
    dark: '#222428',
    medium: '#989aa2',
    light: '#f4f5f8'
  },

  dark: {
    primary: '#FF9900',
    secondary: '#212121',
    tertiary: '#FF9900',
    medium: '#676A6D',
    dark: '#F7F7FF',
    light: '#212121'
  }
};


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
  classList = [{Name: '', courseID: '' }];
  userFirstName = '';
  public sidemenuBottom = [
    {
      title: 'Settings',
      url: '/settings',
      icon: 'settings'
    },
    {
      title: 'Logout',
      url: '/welcome-slide',
      icon: 'log-out'
    }
  ];

  constructor(
    private platform: Platform,
    private orgService: OrganizationService,
    private splashScreen: SplashScreen,
    private menuCtrl: MenuController,
    private statusBar: StatusBar,
    private theme: ThemeService,
    private storage: Storage) {
    storage.get('theme').then(isDark => {this.theme.setTheme(themes[isDark ? 'dark' : 'default']); });
    this.orgService.updateNameOnPages(this.orgService.userINFO);
    this.userFirstName = this.orgService.userFirstName;
    this.orgService.updateSideMenu(this.orgService.sample_response1);
    this.classList = this.orgService.sideMenuItems;
    this.orgService.sideMenuSubject.asObservable().subscribe(() => {
      this.classList = this.orgService.sideMenuItems;
    });
    this.initializeApp();
    }
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.platform.backButton.subscribe(() => {
        // this does work
      });
    });

  }
}
