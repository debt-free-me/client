import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Camera } from '@ionic-native/camera/ngx';

import {
  NgRedux, NgReduxModule, DevToolsExtension
} from '@angular-redux/store';

import jss from 'jss';
import preset from 'jss-preset-default';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AppState } from './typings/state.typing';
import { initialState } from './stores';
import { rootReducer } from './reducers';
import { Tab2Middleware } from './middlewares/tab2.middleware';
import { environment } from 'src/environments/environment';
import { Tab2Service } from './services/tab2.service';
import { ConfigMiddleware } from './middlewares/config.middleware';
import { ConfigService } from './services/config.service';

jss.setup(preset());

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    NgReduxModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    Tab2Middleware,
    ConfigMiddleware,
    Tab2Service,
    ConfigService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(
    private ngRedux: NgRedux<AppState>,
    private devTools: DevToolsExtension,
    private tab2Middleware: Tab2Middleware,
    private configMiddleware: ConfigMiddleware
  ) {
    const middlewares = [
      this.tab2Middleware.middleware,
      this.configMiddleware.middleware,
    ];
    const enhancers = [];

    if (!environment.production && this.devTools.isEnabled()) {
      enhancers.push(this.devTools.enhancer());
    }

    this.ngRedux.configureStore(
      rootReducer,
      initialState,
      middlewares,
      enhancers
    );
  }
}
