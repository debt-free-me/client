import { MiddlewareAPI, Dispatch } from 'redux';
import { FluxStandardAction } from 'flux-standard-action';

export interface MiddlewareInvoker {
  invoke: (action: FluxStandardAction) =>
    FluxStandardAction | Promise<FluxStandardAction>;
  next: Dispatch;
  store: MiddlewareAPI;
}
