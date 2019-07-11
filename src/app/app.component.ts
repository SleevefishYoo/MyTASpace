import { Component } from '@angular/core';
import { ThemeService } from './theme.service';
import { Storage } from '@ionic/storage';
import { Platform, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { OrganizationService } from './organization.service';
import { BrightspaceService } from './brightspace.service';
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
    storage.get('theme').then(isDark => {this.theme.setTheme(themes[isDark ? 'dark' : 'default']); });
    bService.validateSession();
    this.orgService.userFirstNameSubject.subscribe(() => {
      this.userFirstName = this.orgService.userFirstName;
    });
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
      this.statusBar.styleBlackTranslucent();
      if (cordova.platformId === 'android') {
        // this.statusBar.styleBlackOpaque()
      }
      // this.statusBar.backgroundColorByHexString('#33000000');
      // this.statusBar.overlaysWebView(false);
      this.splashScreen.hide();
      this.platform.backButton.subscribe(() => {
        // this does work
      });
    });

  }

  logout(){
    this.bService.logout();

  }
}
