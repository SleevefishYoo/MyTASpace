import { Component } from '@angular/core';
import { OrganizationService } from '../organization.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  userFirstName = '';
  constructor(
    private orgService: OrganizationService
    ) {
    this.userFirstName = this.orgService.userFirstName;
  }
}
