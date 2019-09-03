import { createAction } from '../actions';
import { ConfigActionType } from './config.action';

describe('Config actions', () => {
  it('should correctly generate action object for GetConfig action', () => {
    const expectedActionObject = {
      type: '[ConfigActionType]GetConfig',
    };
    const action = createAction(ConfigActionType.GetConfig);

    expect(action).toEqual(expectedActionObject);
  });

  it('should correctly generate action object for GetActionSuccess action',
    () => {
      const expectedActionObject = {
        type: '[ConfigActionType]GetConfigSuccess',
      };
      const action = createAction(ConfigActionType.GetConfigSuccess);

      expect(action).toEqual(expectedActionObject);
    });
});
