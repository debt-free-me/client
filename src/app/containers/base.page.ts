import _ from 'lodash';
import { NgRedux } from '@angular-redux/store';
import { StyleSheet } from 'jss';
import { ConfigState, AppState } from '../typings/state.typing';
import { Subscription } from 'indefinite-observable';
import { getConfig } from '../actions/config.action';
import { initialState } from '../stores/config.store';
import { FeatureType } from '../typings/feature.typing';
import { isFeatureOn } from '../utils/feature.util';
import { Component, Inject } from '@angular/core';

@Component({
  template: '',
})
export class BasePage {
  config: ConfigState;
  stateSubscription: Subscription;
  styleSheet: StyleSheet;

  constructor(
    public ngRedux: NgRedux<AppState>,
    @Inject(Boolean) shouldNotLoadConfig = false
  ) {
    if (!shouldNotLoadConfig) {
      this.loadConfig();
    }
  }

  onConfigLoad() { }

  isFeatureOn(feature: FeatureType): boolean {
    // @TODO if not config, does it mean all features are on????
    // return false when config is not loaded
    return this.config !== undefined && this.config.features !== undefined
      && isFeatureOn(this.config.features, feature);
  }

  loadConfig() {
    this.config = this.ngRedux.getState().config;
    if (_.isEqual(this.config, initialState)) {
      // only load config once when it is not loaded
      const stateSubscription = this.ngRedux.
        select((state: AppState) => state.config)
        .subscribe(
          (configState: ConfigState) => {
            if (!_.isEqual(configState, initialState)) {
              stateSubscription.unsubscribe();
              this.config = configState;
              this.onConfigLoad();
            }
          });
      this.ngRedux.dispatch(getConfig());
    } else {
      this.onConfigLoad();
    }
  }

}
