import { Component } from '@angular/core';


const themes = {

  default: {
    primary: '#330572',
    secondary: '#330572',
    tertiary: '#f4f5f8',
    dark: '#222428',
    medium: '#989aa2',
    light: '#f4f5f8'
  },

  dark: {
    primary: '#FF9900',
    secondary: '#212121',
    tertiary: '#FF9900',
    medium: '#676A6D',
    dark: '#F7F7FF',
    light: '#212121'
  }
};

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor() {}
}
