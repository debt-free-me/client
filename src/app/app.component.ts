import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './services/auth.service';
import { ConfigStateService } from './services/config-state.service';
import { ConfigState } from '../app/typings/state.typing';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private configStateService: ConfigStateService,
    private authService: AuthService
  ) {
    this.initializeApp();
  }

  async initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    const config: ConfigState = await this.configStateService.load();

    this.authService.init(
      config.settings.authUrl,
      config.settings.authClientId
    );

    this.authService.localAuthSetup();
  }
}
