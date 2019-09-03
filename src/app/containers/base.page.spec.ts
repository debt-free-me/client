import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  NgReduxTestingModule, MockNgRedux
} from '@angular-redux/store/testing';

import { BasePage } from './base.page';
import { AppState, ConfigState } from '../typings/state.typing';
import { FeatureType } from '../typings/feature.typing';
import { getConfig } from '../actions/config.action';
import { initialState } from '../stores/';

let component: BasePage;
let fixture: ComponentFixture<BasePage>;
const stub = MockNgRedux.getSelectorStub<AppState, AppState>();

function stubConfigState(state: AppState) {
  stub.next(state);
  stub.complete();
  fixture.detectChanges();
}

function createInstance() {
  fixture = TestBed.createComponent(BasePage);
  component = fixture.componentInstance;
}

describe('BasePage', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BasePage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [NgReduxTestingModule],
      providers: [
        MockNgRedux,
        { provide: Boolean, useValue: true },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    createInstance();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should detect correctly if a feature is on', () => {
    const feature = <FeatureType>'testFeature';
    component.config = { features: undefined };
    expect(component.isFeatureOn(feature)).toBe(false);
    component.config = { features: { [feature]: false } };
    expect(component.isFeatureOn(feature)).toBe(false);
    component.config = { features: { [feature]: true } };
    expect(component.isFeatureOn(feature)).toBe(true);
  });

  it('should load config', () => {
    spyOn(component.ngRedux, 'dispatch');
    spyOn(component.ngRedux, 'getState').and.returnValue(initialState);
    component.ngRedux.
      select((state: AppState) => state.config)
      .subscribe(
        (configState: ConfigState) => {
          expect(configState).toEqual(initialState.config);
        });
    component.loadConfig();
    expect(component.ngRedux.dispatch).toHaveBeenCalledWith(getConfig());
  });

  it('should assign config', () => {
    spyOn(component.ngRedux, 'dispatch');
    const state: ConfigState = {
      features: {
        [FeatureType.Camera]: true,
      },
    };
    stubConfigState(<AppState>{
      config: state,
    });
    component.ngRedux.
      select((appState: AppState) => appState.config)
      .subscribe(
        (configState: ConfigState) => {
          expect(configState).toEqual(state);
        });
    component.loadConfig();
    expect(component.ngRedux.dispatch).not.toHaveBeenCalled();
  });
});
