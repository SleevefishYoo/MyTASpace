import { Component } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { BrightspaceService } from '../brightspace.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  userFirstName = '';
  constructor(
    private bService: BrightspaceService,
    private statusBar: StatusBar,
    ) {
      this.bService.userFirstNameSubject.subscribe(() =>{
        this.userFirstName = bService.userFirstName;
      });
      this.userFirstName = this.bService.userFirstName;
      this.statusBar.show();
  }
}
