import { Component } from '@angular/core';
import { OrganizationService } from '../organization.service';
import { StatusBar } from '@ionic-native/status-bar/ngx';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  userFirstName = '';
  constructor(
    private orgService: OrganizationService,
    private statusBar: StatusBar) {
      this.orgService.userFirstNameSubject.subscribe(() =>{
        this.userFirstName = orgService.userFirstName;
      });
      this.userFirstName = this.orgService.userFirstName;
      this.statusBar.show();
  }
}
