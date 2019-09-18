import { Injectable } from '@angular/core';
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
export class ConfigStateService {
  constructor(public ngRedux: NgRedux<AppState>) { }

  load(): Promise<ConfigState> {
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
