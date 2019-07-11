import {  NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { ContactusPage } from '../contactus/contactus.page';


import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: ContactusPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ContactusPage]
})
export class ContactusPageModule {}
