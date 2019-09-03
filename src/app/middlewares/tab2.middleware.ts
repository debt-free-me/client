import { Middleware, Dispatch, MiddlewareAPI } from 'redux';
import {
  Tab2Action,
  Tab2ActionType,
  takePhotoSuccess,
} from '../actions/tab2.action';
import { Tab2Service } from '../services/tab2.service';
import { Injectable } from '@angular/core';
import { InjectableMiddleware } from '../typings/middleware.typing';

@Injectable()
export class Tab2Middleware implements InjectableMiddleware {

  get middleware(): Middleware {
    const middleware: Middleware =
      (api: MiddlewareAPI) => (next: Dispatch) => async (action: Tab2Action):
        Promise<Tab2Action | void> => {
        switch (action.type) {
          case Tab2ActionType.TakePhoto: {
            next(action); // set the loading state
            const data = await this.tab2Service.getTab2Data();
            // don't have to return, this is for unit test purposes
            return api.dispatch(takePhotoSuccess());
            break;
          }
          default: {
            next(action);
          }
        }
      };
    return middleware;
  }

  constructor(private tab2Service: Tab2Service) { }
}
