import { AppState } from '../typings/state.typing';
import { initialState as initialConfigState } from '../stores/config.store';
import { initialState as initialTab2State } from '../stores/tab2.store';

export const initialState: AppState = {
  config: initialConfigState,
  tab2: initialTab2State,
};
