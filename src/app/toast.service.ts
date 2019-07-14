import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { OrganizationService } from './organization.service';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastController: ToastController,
              private orgService: OrganizationService) { }
  toast;
  public showNormalToast(userMessage: string) {
    this.toast = this.toastController.create({
      message: '✔️ ' + userMessage,
      duration: 2000,
      cssClass: 'normal-toast',
      position: 'top'
    }).then((toastData) => {
      toastData.present();
    });
  }

  public showWarningToast(userMessage: string) {
    this.toast = this.toastController.create({
      message: '🥺 ' + userMessage,
      duration: 2000,
      cssClass: 'warning-toast',
      position: 'top'
    }).then((toastData) => {
      toastData.present();
    });
  }

  public HideToast() {
    this.toast = this.toastController.dismiss();
  }

  public updateNameOnPages(jsonResponse: string) {
    this.orgService.userFirstName = JSON.parse(jsonResponse).FirstName;
    this.orgService.userFirstNameSubject.next('new user Name');
  }
}
