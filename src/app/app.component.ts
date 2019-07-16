import { Component } from '@angular/core';
import { ThemeService } from './theme.service';
import { Storage } from '@ionic/storage';
import { Platform, MenuController, AlertController } from '@ionic/angular';
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

  loading = true;
  public bug_prompted = false;


  constructor(
    private platform: Platform,
    private orgService: OrganizationService,
    private splashScreen: SplashScreen,
    private menuCtrl: MenuController,
    private statusBar: StatusBar,
    private theme: ThemeService,
    private storage: Storage,
    private alertController: AlertController,
    private bService: BrightspaceService) {
    storage.get('theme').then(isDark => {this.theme.setTheme(theme.themes[isDark ? 'dark' : 'default']); });
    bService.validateSession();
    this.storage.get('bug_prompted').then((bug_prompted) => {
      this.bug_prompted = bug_prompted;
    });
    this.bService.userFirstNameSubject.subscribe(() => {
      this.userFirstName = this.bService.userFirstName;
    });
    this.bService.sideMenuSubject.asObservable().subscribe(() => {
      this.classList = this.bService.sideMenuItems;
      this.loading = false;
    });
    this.classList = this.bService.sideMenuItems;
    this.initializeApp();
    this.storage.set('bug_prompted', true);

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


  async bugPrompt() {
    const alert = await this.alertController.create({
      header: 'Hey there!',
      subHeader: 'Looks like you have encountered a bug that we cannot fix yet.',
      message: 'The framework this app is based on have this glich that your courses would not show up the first time. We are actively collaborating with the framework team to fix it. By now your courses should be there waiting for you!',
      cssClass: 'myNormalPrompt',
      buttons: [
        {
          text: 'Gotcha!',
        }
      ]
    });
    await alert.present();
    this.bug_prompted = true;
  }


  logout() {
    this.bService.logout(1);

  }

  
}
