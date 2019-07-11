import { Component, OnInit } from '@angular/core';
import { MenuController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-welcome-slide',
  templateUrl: './welcome-slide.page.html',
  styleUrls: ['./welcome-slide.page.scss'],
})
export class WelcomeSlidePage implements OnInit {

  constructor(private menuController: MenuController,
              private platform: Platform) {

  }
  sub;

  ionViewWillEnter() {
    this.menuController.enable(false);
    this.sub = this.platform.backButton.subscribeWithPriority(1, () => {});
  }

  ionViewDidLeave() {
    this.menuController.enable(true);
    this.sub.unsubscribe();
  }
  
  ngOnInit() {

  }
  
}
