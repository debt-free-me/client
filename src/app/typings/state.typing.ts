import { FeatureType, SettingType } from './feature.typing';

// general state type, for categorization purposes
// tslint:disable-next-line: no-empty-interface
export interface State {
}

export interface AppState extends State {
  config: ConfigState;
  tab2: Tab2State;
}

export interface Tab2State extends State {
  isLoading: boolean;
  count: number;
}

export interface ConfigState extends State {
  features: Record<FeatureType, boolean>;
  settings: Record<SettingType, string>;
}
