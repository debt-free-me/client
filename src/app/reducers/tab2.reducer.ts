import { Reducer } from 'redux';
import { initialState } from '../stores/tab2.store';
import { Tab2Action, Tab2ActionType } from '../actions/tab2.action';
import { Tab2State } from '../typings/state.typing';

export const reducer: Reducer<Tab2State, Tab2Action> =
  (state: Tab2State = initialState, action: Tab2Action): Tab2State => {
    switch (action.type) {
      case Tab2ActionType.TakePhoto: {
        return {
          ...state,
          isLoading: true,
        };
      }
      case Tab2ActionType.TakePhotoSuccess: {
        return {
          ...state,
          isLoading: false,
          count: state.count + 1,
        };
      }
    }
    return {
      ...state,
    };
  };


