import { Injectable } from '@angular/core';
import {
  CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot
} from '@angular/router';

import { ConfigState } from '../typings/state.typing';
import { isConfigValid } from '../utils/config.util';
import { ConfigStateService } from '../services/config-state.service';

@Injectable()
export class ConfigGuard implements CanActivate {
  constructor(public configStateService: ConfigStateService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    return this.configStateService.load().then((configState: ConfigState) => {
      if (isConfigValid(configState)) {
        return true;
      }
      return false;
    }).catch(() => false);
  }
}
