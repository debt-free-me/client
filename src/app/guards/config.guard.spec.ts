import { TestBed } from '@angular/core/testing';
import { ConfigGuard } from './config.guard';
import { ConfigStateService } from '../services/config-state.service';
import {
  NgReduxTestingModule, MockNgRedux
} from '@angular-redux/store/testing';

describe('ConfigGuard', () => {
  let guard: ConfigGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgReduxTestingModule],
      providers: [ConfigGuard, ConfigStateService],
    });
    guard = TestBed.get(ConfigGuard);
  });

  it('should be truthy', () => {
    expect(guard).toBeTruthy();
  });
});
