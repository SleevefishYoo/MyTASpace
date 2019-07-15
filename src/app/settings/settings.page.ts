import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../theme.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  public isDarkMode = false;
  constructor(private theme: ThemeService, private storage: Storage) {
    storage.get('theme').then(isDark => {
      this.isDarkMode = isDark;
      this.darkModeToggle();
    });
   }
  darkModeToggle() {
    this.changeTheme(this.isDarkMode ? 'dark' : 'default');
    this.storage.set('theme', this.isDarkMode);
  }
  changeTheme(name: string) {
    this.theme.setTheme(this.theme.themes[name]);
  }
  ngOnInit() {
  }

}
