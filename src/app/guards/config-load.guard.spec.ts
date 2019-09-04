import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule, HttpTestingController
} from '@angular/common/http/testing';
import {
  NgReduxTestingModule, MockNgRedux
} from '@angular-redux/store/testing';
import { ConfigLoadGuard } from './config-load.guard';
import { ConfigState, AppState } from '../typings/state.typing';
import { FeatureType } from '../typings/feature.typing';
import { getConfig } from '../actions/config.action';
import { initialState } from '../stores/config.store';



function stubConfigState(stub, state: AppState) {
  stub.next(state);
  stub.complete();
}

xdescribe('ConfigLoadGuard', () => {
  let stub;
  let guard: ConfigLoadGuard;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgReduxTestingModule],
      providers: [MockNgRedux, ConfigLoadGuard],
    });
    guard = TestBed.get(ConfigLoadGuard);
    stub = MockNgRedux.getSelectorStub<AppState, AppState>();
  });

  it('should load config when retrieved', (done: DoneFn) => {
    // const onConfigChange = jasmine.createSpy('onConfigChange');
    stubConfigState(stub, <AppState>{
      config: initialState,
    });
    const promise: Promise<ConfigState> = guard.loadConfig();
    console.log('mock instance ', MockNgRedux.getInstance().select().pipe);
    const spy = spyOn(MockNgRedux.getInstance(), 'dispatch');
    const expectedConfig: ConfigState = {
      features: {
        [FeatureType.Camera]: true,
      },
    };

    stubConfigState(stub, <AppState>{
      config: expectedConfig,
    });
    guard.ngRedux.select((state: AppState) => state.config)
      .subscribe((config: ConfigState) => {
        console.log('config ', config);
      });

    stubConfigState(stub, <AppState>{
      config: expectedConfig,
    });
    promise.then((config: ConfigState) => {
      console.log('got here');
      expect(config).toEqual(expectedConfig);
      done();
    });

    // expect(spy).toHaveBeenCalledWith(getConfig());

    // expect(onConfigChange).toHaveBeenCalledTimes(1);
    // expect(onConfigChange).toHaveBeenCalledWith(expectedConfig);
  });

  it('should NOT load config after initialization', () => {
    const onConfigChange = jasmine.createSpy('onConfigChange');
    const expectedConfig: ConfigState = initialState;
    const promise: Promise<ConfigState> = guard.loadConfig();

    stubConfigState(stub, <AppState>{
      config: expectedConfig,
    });

    promise.then(onConfigChange);

    expect(onConfigChange).toHaveBeenCalledTimes(0);
  });
});
