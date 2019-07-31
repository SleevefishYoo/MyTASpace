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
  public bugPrompted = false;


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
    this.storage.get('bug_prompted').then((bugPrompted) => {
      this.bugPrompted = bugPrompted;
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


  async rolePrompt() {
    let alert = await this.alertController.create({
      header: 'Oh No!',
      subHeader: 'Looks like your courses have gone for a walk.',
      message: 'This app would only display courses of which you are an IA/TA/Instructor.',
      cssClass: 'myNormalPrompt',
      buttons: [
        {
          text: 'Gotcha!',
          role: 'cancel',
        },
        {
          text: 'But I am an IA/TA/Instructor',
          handler: () => {
            this.bugPrompt();
          }
        },
      ]
    });
    await alert.present();
    this.bugPrompted = true;
  }

  async bugPrompt() {
    let alert = await this.alertController.create({
      header: 'We are sorry about this!',
      subHeader: 'Looks like you\'ve encountered a bug we cannot fix yet.',
      message: 'We have discovered this glich in the framework we are using that may result in your courses not showing up the first time you log in. We are actively collaborating with the framework team to fix it. By now your courses should be there waiting for you!',
      cssClass: 'myNormalPrompt',
      buttons: [
        {
          text: 'Gotcha!',
        }
      ]
    });
    await alert.present();
  }

  logout() {
    this.bService.logout(1);

  }


}
