import { Component } from '@angular/core';
import { ThemeService } from '../theme.service';
import { Storage } from '@ionic/storage';


const themes = {

  default: {
    primary: '#3880ff',
    secondary: '#0cd1e8',
    tertiary: '#7044ff',
    dark: '#222428',
    medium: '#989aa2',
    light: '#f4f5f8'
  },

  dark: {
    primary: '#8CBA80',
    secondary: '#FCFF6C',
    tertiary: '#FE5F55',
    medium: '#BCC2C7',
    dark: '#F7F7FF',
    light: '#495867'
  }
};

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public isDarkMode: boolean = false;
  constructor(private theme: ThemeService, private storage: Storage) {
    storage.get('theme').then(isDark => {
      this.isDarkMode = isDark;
      this.theme.setTheme(themes[this.isDarkMode ? 'dark' : 'default']);
    });
  }
}
