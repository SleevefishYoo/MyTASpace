import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { WelcomeSlidePage } from './welcome-slide.page';

const routes: Routes = [
  {
    path: '',
    component: WelcomeSlidePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [WelcomeSlidePage]
})
export class WelcomeSlidePageModule {}
