import { createAction as createActionCreator } from 'redux-actions';
import { FluxStandardAction } from 'flux-standard-action';
import { AppState } from '../typings/state.typing';

export function createAction<T = FluxStandardAction<string>>
  (type: string, payload?: Record<string, any>): T {
  return createActionCreator(type)(payload);
}

export interface AppAction extends FluxStandardAction<string, AppState> { }

export enum AppActionType { }
