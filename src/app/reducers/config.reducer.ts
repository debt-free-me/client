import { Reducer } from 'redux';
import { initialState } from '../stores/config.store';
import { ConfigAction, ConfigActionType } from '../actions/config.action';
import { ConfigState } from '../typings/state.typing';

export const reducer: Reducer<ConfigState, ConfigAction> =
  (state: ConfigState = initialState, action: ConfigAction): ConfigState => {
    switch (action.type) {
      case ConfigActionType.GetConfigSuccess: {
        return {
          ...state,
          ...action.payload,
        };
      }
    }
    return {
      ...state,
    };
  };


