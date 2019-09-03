import { createAction } from '../actions';
import { Tab2ActionType } from './tab2.action';

describe('Tab2 actions', () => {
  it('should correctly generate action object for TakePhoto action', () => {
    const expectedActionObject = {
      type: '[Tab2ActionType]TakePhoto',
    };
    const action = createAction(Tab2ActionType.TakePhoto);

    expect(action).toEqual(expectedActionObject);
  });

  it('should correctly generate action object for TakePhotoSuccess action',
    () => {
      const expectedActionObject = {
        type: '[Tab2ActionType]TakePhotoSuccess',
      };
      const action = createAction(Tab2ActionType.TakePhotoSuccess);

      expect(action).toEqual(expectedActionObject);
    });
});
