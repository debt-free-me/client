import _ from 'lodash';
import { NgRedux } from '@angular-redux/store';
import { StyleSheet } from 'jss';
import { ConfigState, AppState } from '../../typings/state.typing';
import { Subscription } from 'indefinite-observable';
import { FeatureType } from '../../typings/feature.typing';
import { isFeatureOn, isConfigValid } from '../../utils/config.util';
import { Component } from '@angular/core';

@Component({
  template: '',
})
export class BasePage {
  config: ConfigState;
  stateSubscription: Subscription;
  styleSheet: StyleSheet;

  constructor(public ngRedux: NgRedux<AppState>) {
    this.loadConfig();
  }

  isFeatureOn(feature: FeatureType): boolean {
    // @TODO if not config, does it mean all features are on????
    // return false when config is not loaded
    return isConfigValid(this.config)
      && isFeatureOn(this.config.features, feature);
  }

  loadConfig() {
    this.config = this.ngRedux.getState().config;
  }

}
