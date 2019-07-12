import { Component, OnInit } from '@angular/core';
import { version } from '../../../package.json';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {
  public ver: string = version;
  constructor() { }

  ngOnInit() {
  }

  version() {
    return this.ver;
  }
  platform() {
    if (cordova.platformId === 'android') {
      return 'Android';
      } else {
        return 'IOS';
      }
  }
}
