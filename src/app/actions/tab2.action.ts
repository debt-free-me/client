import { FluxStandardAction } from 'flux-standard-action';
import { Tab2State } from '../typings/state.typing';
import { createAction } from '.';

export enum Tab2ActionType {
  TakePhoto = '[Tab2ActionType]TakePhoto',
  TakePhotoSuccess = '[Tab2ActionType]TakePhotoSuccess',
}

export interface Tab2Action extends FluxStandardAction<string, Tab2State> { }

export function takePhoto(): Tab2Action {
  return createAction<Tab2Action>(Tab2ActionType.TakePhoto);
}

export function takePhotoSuccess(): Tab2Action {
  return createAction<Tab2Action>(Tab2ActionType.TakePhotoSuccess);
}
