import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../theme.service';
import { Storage } from '@ionic/storage';


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
    medium: '#BCC2C7',
    dark: '#F7F7FF',
    light: '#212121'
  }
};

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  public isDarkMode: boolean = false;
  constructor(private theme: ThemeService, private storage: Storage) {
    storage.get('theme').then(isDark => {
      this.isDarkMode = isDark;
      this.darkModeToggle();
    });
   }
  darkModeToggle(){
    this.changeTheme(this.isDarkMode ? 'dark' : 'default');
    this.storage.set('theme', this.isDarkMode);
  }
  changeTheme(name: string) {
    this.theme.setTheme(themes[name]);
  }
  ngOnInit() {

  }

}
