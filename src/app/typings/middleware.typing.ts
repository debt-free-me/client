import { Middleware } from 'redux';

export interface InjectableMiddleware {
  readonly middleware: Middleware;
}
