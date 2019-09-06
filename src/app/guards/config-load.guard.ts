import { Injectable } from '@angular/core';
import {
  CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot
} from '@angular/router';
import { tap, filter, take } from 'rxjs/operators';
import { NgRedux, Selector } from '@angular-redux/store';

import { AppState, ConfigState } from '../typings/state.typing';
import { getConfig } from '../actions/config.action';
import { isConfigValid } from '../utils/config.util';

export const configStateSelector: Selector<AppState, ConfigState> =
  (appState: AppState) => {
    // console.log('app state ', appState);
    return appState.config;
  };
@Injectable()
export class ConfigLoadGuard implements CanActivate {
  constructor(public ngRedux: NgRedux<AppState>) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    return this.loadConfig().then((configState: ConfigState) => {
      if (isConfigValid(configState)) {
        return true;
      }
      return false;
    }).catch(() => false);
  }

  loadConfig(): Promise<ConfigState> {
    return this.ngRedux.
      select(configStateSelector).pipe(
        tap((configState: ConfigState) => {
          if (!isConfigValid(configState)) {
            this.ngRedux.dispatch(getConfig());
          }
        }),
        filter((configState: ConfigState) => {
          if (isConfigValid(configState)) {
            return true;
          } else {
            return false;
          }
        }),
        take(1)
      ).toPromise();
  }
}
