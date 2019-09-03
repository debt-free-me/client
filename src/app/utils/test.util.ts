import { Middleware, MiddlewareAPI, Dispatch } from 'redux';
import { MiddlewareInvoker } from '../typings/test.typing';
import { FluxStandardAction } from 'flux-standard-action';

export function createMiddlewareInvoker(middleware: Middleware):
  MiddlewareInvoker {
  const store: MiddlewareAPI = {
    getState: jasmine.createSpy(),
    dispatch: jasmine.createSpy(),
  };
  const next: Dispatch = jasmine.createSpy();

  function invoke<T = FluxStandardAction>(action: T):
    FluxStandardAction | Promise<FluxStandardAction | undefined> {
    return middleware(store)(next)(action);
  }

  return { store, next, invoke };
}
