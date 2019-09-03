import { TestBed } from '@angular/core/testing';
import { Tab2Service, tab2DataUrl } from './tab2.service';
import { HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule, HttpTestingController
} from '@angular/common/http/testing';

describe('Tab2Service', () => {
  let service: Tab2Service;
  let mockHttpClient: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [Tab2Service, HttpClient],
    });
    service = TestBed.get(Tab2Service);
    mockHttpClient = TestBed.get(HttpTestingController);
  });

  it('should call correct api and get correct data', () => {
    const expected = [];

    service.getTab2Data().then((data) => {
      expect(data).toEqual(expected);
    });

    const request = mockHttpClient.expectOne(tab2DataUrl);
    expect(request.request.method).toBe('GET');
    request.flush(expected);
  });
});
