import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export const tab2DataUrl = 'https://api.github.com/users/octocat/orgs';

@Injectable()
export class Tab2Service {
  constructor(public httpClient: HttpClient) { }

  async getTab2Data(): Promise<any> {
    return this.httpClient.get(tab2DataUrl)
      .toPromise().then((json) => {
        return json;
      });
  }
}
