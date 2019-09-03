import { createAction } from '../actions';
import { Tab2ActionType } from '../actions/tab2.action';
import { reducer } from './tab2.reducer';
import { initialState } from '../stores/tab2.store';

describe('Tab2 reducer', () => {
  it('should correctly update state for TakePhoto action', () => {
    const action = createAction(Tab2ActionType.TakePhoto);
    const result = reducer(initialState, action);

    expect(result.isLoading).toEqual(true);
  });

  it('should correctly update state for TakePhotoSuccess action', () => {
    const COUNT = 11;
    const EXPECTED_COUNT = COUNT + 1;
    const IS_LOADNG = true;
    const EXPECTED_IS_LOADING = false;

    const action = createAction(Tab2ActionType.TakePhotoSuccess);
    const result = reducer({
      ...initialState,
      isLoading: IS_LOADNG,
      count: COUNT,
    }, action);

    expect(result.isLoading).toEqual(EXPECTED_IS_LOADING);
    expect(result.count).toEqual(EXPECTED_COUNT);
  });
});
