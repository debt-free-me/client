import { createAction } from '../actions';
import {
  ConfigActionType,
  getConfig,
  getConfigSuccess,
} from '../actions/config.action';
import { createMiddlewareInvoker } from '../utils/test.util';
import { ConfigMiddleware } from './config.middleware';
import { MiddlewareInvoker } from '../typings/test.typing';
import { TestBed } from '@angular/core/testing';
import { ConfigService } from '../services/config.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ConfigState } from '../typings/state.typing';

describe('Config middleware', () => {
  let middlewareInvoker: MiddlewareInvoker;
  let middleware: ConfigMiddleware;
  let service: jasmine.SpyObj<ConfigService>;

  const expectedData: ConfigState = {
    features: { camera: true },
    settings: undefined,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        HttpClient,
        ConfigMiddleware,
        {
          provide: ConfigService,
          useValue: jasmine.createSpyObj('ConfigService', ['getConfig']),
        },
      ],
    });
    middleware = TestBed.get(ConfigMiddleware);
    middlewareInvoker = createMiddlewareInvoker(middleware.middleware);
    service = TestBed.get(ConfigService);
  });

  it('should intercept GetConfig action and dispatch GetConfigSuccess actions',
    async () => {
      service.getConfig.and.returnValue(expectedData);
      const action = createAction(ConfigActionType.GetConfig);
      await middlewareInvoker.invoke(action);

      expect(middlewareInvoker.store.dispatch)
        .toHaveBeenCalledWith(getConfigSuccess(expectedData));
    });

  it('should NOT intercept GetConfigSuccess action ', async () => {
    const action = createAction(
      ConfigActionType.GetConfigSuccess, expectedData);
    await middlewareInvoker.invoke(action);

    expect(middlewareInvoker.next).toHaveBeenCalledWith(
      getConfigSuccess(expectedData));
    expect(middlewareInvoker.store.dispatch)
      .not.toHaveBeenCalled();
  });

});
