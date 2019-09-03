import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Camera } from '@ionic-native/camera/ngx';
import { IonicStorageModule } from '@ionic/storage';
import {
  NgReduxTestingModule, MockNgRedux
} from '@angular-redux/store/testing';

import { Tab2Page } from './tab2.page';
import { AppState, Tab2State } from '../../typings/state.typing';
import { initialState } from 'src/app/stores/config.store';

describe('Tab2Page', () => {
  let component: Tab2Page;
  let fixture: ComponentFixture<Tab2Page>;
  const state: Tab2State = { count: 0, isLoading: false };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [Tab2Page],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [IonicStorageModule.forRoot(), NgReduxTestingModule],
      providers: [Camera, MockNgRedux],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Tab2Page);
    component = fixture.componentInstance;
    component.config = initialState;
    component.stateSubscription =
      jasmine.createSpyObj('stateSubscription', ['unsubscribe']);

    const stub = MockNgRedux.getSelectorStub<AppState, Tab2State>();
    stub.next(state);
    stub.complete();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    component.ngOnInit();
  });

  it('should get correct tab2 state', () => {
    component.tab2$.subscribe((tab2State: Tab2State) => {
      expect(tab2State.count).toEqual(state.count);
      expect(tab2State.isLoading).toEqual(state.isLoading);
    });
    component.ngOnInit();
  });
});
