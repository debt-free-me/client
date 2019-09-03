import { combineReducers, Reducer } from 'redux';
import { reducer as tab2Reducer } from './tab2.reducer';
import { reducer as configReducer } from './config.reducer';
import { AppState } from '../typings/state.typing';
import { FluxStandardAction } from 'flux-standard-action';
import { initialState } from '../stores';
import { AppAction } from '../actions';

export const rootReducer: Reducer<AppState, FluxStandardAction> =
  combineReducers({
    config: configReducer,
    tab2: tab2Reducer,
  });

export const reducer: Reducer<AppState, AppAction> =
  (state: AppState = initialState, action: AppAction): AppState => {
    return {
      ...state,
    };
  };
