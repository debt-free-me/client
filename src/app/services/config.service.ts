import { Injectable } from '@angular/core';
import config from '../../configs/index.json';
import { ConfigState } from '../typings/state.typing.js';

@Injectable()
export class ConfigService {

  getConfig(): Promise<ConfigState> {
    return new Promise((resolve, reject) => {
      resolve(this.getConfigSync());
    });
  }

  getConfigSync(): ConfigState {
    return <ConfigState>config;
  }
}
