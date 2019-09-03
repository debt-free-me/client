import { FluxStandardAction } from 'flux-standard-action';
import { ConfigState } from '../typings/state.typing';
import { createAction } from '.';

export enum ConfigActionType {
  GetConfig = '[ConfigActionType]GetConfig',
  GetConfigSuccess = '[ConfigActionType]GetConfigSuccess',
}

export interface ConfigAction extends
  FluxStandardAction<string, ConfigState> { }

export function getConfig(): ConfigAction {
  return createAction<ConfigAction>(ConfigActionType.GetConfig);
}

export function getConfigSuccess(config: ConfigState): ConfigAction {
  return createAction<ConfigAction>(
    ConfigActionType.GetConfigSuccess,
    { ...config }
  );
}
