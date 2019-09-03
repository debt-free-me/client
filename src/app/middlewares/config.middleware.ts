import { Middleware, Dispatch, MiddlewareAPI } from 'redux';
import { Injectable } from '@angular/core';
import { InjectableMiddleware } from '../typings/middleware.typing';
import {
  ConfigAction, ConfigActionType, getConfigSuccess
} from '../actions/config.action';
import { ConfigService } from '../services/config.service';

@Injectable()
export class ConfigMiddleware implements InjectableMiddleware {

  get middleware(): Middleware {
    const middleware: Middleware =
      (api: MiddlewareAPI) => (next: Dispatch) => async (action: ConfigAction):
        Promise<ConfigAction | void> => {
        switch (action.type) {
          case ConfigActionType.GetConfig: {
            const data = await this.configService.getConfig();
            // don't have to return, this is for unit test purposes
            return api.dispatch(getConfigSuccess(data));
            break;
          }
          default: {
            next(action);
          }
        }
      };
    return middleware;
  }

  constructor(private configService: ConfigService) { }
}
