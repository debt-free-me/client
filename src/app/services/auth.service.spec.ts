import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { AppRoutingModule } from '../app-routing.module';

describe('AuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [AppRoutingModule],
  }));

  it('should be created', () => {
    const service: AuthService = TestBed.get(AuthService);
    expect(service).toBeTruthy();
  });
});
