import { Component, OnInit } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { BrightspaceService } from '../brightspace.service';
import { ThemeService } from '../theme.service';
import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  userFirstName = '';
  constructor(
    private bService: BrightspaceService,
  ) {
    this.bService.userFirstNameSubject.subscribe(() => {
      this.userFirstName = bService.userFirstName;
    });
    this.userFirstName = this.bService.userFirstName;
  }

  ionViewDidEnter() {

  }
}
