import { createAction } from '../actions';
import { ConfigActionType } from '../actions/config.action';
import { reducer } from './config.reducer';
import { initialState } from '../stores/config.store';
import { ConfigState } from '../typings/state.typing';

describe('Config reducer', () => {
  it('should correctly update state for GetConfigSuccess action', () => {
    const expectedConfig: ConfigState = {
      features: { camera: false }, settings: undefined,
    };
    const action = createAction(
      ConfigActionType.GetConfigSuccess, expectedConfig
    );
    const result = reducer(initialState, action);

    expect(result).toEqual(expectedConfig);
  });
});
