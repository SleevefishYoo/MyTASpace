import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-welcome-slide',
  templateUrl: './welcome-slide.page.html',
  styleUrls: ['./welcome-slide.page.scss'],
})
export class WelcomeSlidePage implements OnInit {

  constructor(private menuController: MenuController) {
     
  }

  /* ionViewWillEnter() {
    this.menuController.enable(false);
  }
  
  ionViewDidLeave() {
    this.menuController.enable(true);
  }
 */
  ngOnInit() {
    
  }
  slider = [
    {
      title:'Title',
      description:'Description',
      image:"assets/Screen Shot 2019-05-28 at 2.29.58 PM.png"
    },
    {
      title:'Title',
      description:'Description',
      image:"assets/Screen Shot 2019-05-28 at 2.29.58 PM.png"
    },
    {
      title:'Title',
      description:'Description',
      image:"assets/Screen Shot 2019-05-28 at 2.29.58 PM.png"
    },
  ];
}
