import { createAction } from '../actions';
import {
  Tab2ActionType,
  takePhotoSuccess,
  takePhoto,
} from '../actions/tab2.action';
import { createMiddlewareInvoker } from '../utils/test.util';
import { Tab2Middleware } from './tab2.middleware';
import { MiddlewareInvoker } from '../typings/test.typing';
import { TestBed } from '@angular/core/testing';
import { Tab2Service } from '../services/tab2.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

describe('Tab2 middleware', () => {
  let middlewareInvoker: MiddlewareInvoker;
  let middleware: Tab2Middleware;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [HttpClient, Tab2Service, Tab2Middleware],
    });
    middleware = TestBed.get(Tab2Middleware);
    middlewareInvoker = createMiddlewareInvoker(middleware.middleware);
  });

  it('should intercept TakePhoto action and dispatch TakePhotoSuccess actions',
    async () => {
      const action = createAction(Tab2ActionType.TakePhoto);
      await middlewareInvoker.invoke(action);

      expect(middlewareInvoker.next).toHaveBeenCalledWith(takePhoto());
      expect(middlewareInvoker.store.dispatch)
        .toHaveBeenCalledWith(takePhotoSuccess());
    });

  it('should NOT intercept TakePhotoSuccess action ', async () => {
    const action = createAction(Tab2ActionType.TakePhotoSuccess);
    await middlewareInvoker.invoke(action);

    expect(middlewareInvoker.next).toHaveBeenCalledWith(takePhotoSuccess());
    expect(middlewareInvoker.store.dispatch)
      .not.toHaveBeenCalled();
  });

});
