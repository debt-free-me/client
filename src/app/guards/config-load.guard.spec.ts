import { TestBed } from '@angular/core/testing';
import {
  NgReduxTestingModule, MockNgRedux
} from '@angular-redux/store/testing';
import { Subject } from 'rxjs';
import { ConfigLoadGuard, configStateSelector } from './config-load.guard';
import { ConfigState, AppState } from '../typings/state.typing';
import { FeatureType } from '../typings/feature.typing';
import { getConfig } from '../actions/config.action';
import { initialState } from '../stores/config.store';

let stub: Subject<ConfigState>;
function stubConfigState(state: ConfigState) {
  stub.next(state);
  stub.complete();
}

xdescribe('ConfigLoadGuard', () => {
  let guard: ConfigLoadGuard;

  beforeEach(() => {

    // MockNgRedux.reset();
    TestBed.configureTestingModule({
      imports: [NgReduxTestingModule],
      providers: [MockNgRedux, ConfigLoadGuard],
    });
    guard = TestBed.get(ConfigLoadGuard);

    stub = MockNgRedux
      .getSelectorStub<AppState, ConfigState>(configStateSelector);
  });



  it('should get config', async (done: DoneFn) => {

    stubConfigState(initialState);
    // const promise: Promise<ConfigState> = guard.loadConfig();
    // const dispatchSpy = spyOn(guard.ngRedux, 'dispatch');
    // const selectSpy = spyOn(guard.ngRedux, 'select');

    // promise.then((configState: ConfigState) => {
    //   console.log('promise then');
    //   expect(configState).toEqual(initialState);
    //   done();
    // });

    // expect(dispatchSpy).toHaveBeenCalledWith(getConfig());
    // expect(guard.ngRedux.select).toHaveBeenCalled();
    expect(await guard.loadConfig()).toEqual(initialState);
  });

  it('should load config', (done: DoneFn) => {
    // const onConfigChange = jasmine.createSpy('onConfigChange');
    const expectedConfig: ConfigState = {
      features: {
        [FeatureType.Camera]: true,
      },
    };
    const promise: Promise<ConfigState> = guard.loadConfig();

    stubConfigState(expectedConfig);

    promise.then((configState: ConfigState) => {
      // console.log('promise then', configState);
      expect(configState).toEqual(expectedConfig);
      done();
    });

    // expect(onConfigChange).toHaveBeenCalledTimes(0);
  });
});
