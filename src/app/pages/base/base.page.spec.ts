import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  NgReduxTestingModule, MockNgRedux
} from '@angular-redux/store/testing';

import { BasePage } from './base.page';
import { AppState, ConfigState } from '../../typings/state.typing';
import { FeatureType } from '../../typings/feature.typing';
import { getConfig } from '../../actions/config.action';
import { initialState } from '../../stores';

let component: BasePage;
let fixture: ComponentFixture<BasePage>;

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
      providers: [MockNgRedux],
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
    component.config = { features: undefined, settings: undefined };
    expect(component.isFeatureOn(feature)).toBe(false);
    component.config = { features: { [feature]: false }, settings: undefined };
    expect(component.isFeatureOn(feature)).toBe(false);
    component.config = { features: { [feature]: true }, settings: undefined };
    expect(component.isFeatureOn(feature)).toBe(true);
  });

  it('should load config', () => {
    spyOn(component.ngRedux, 'dispatch');
    spyOn(component.ngRedux, 'getState').and.returnValue(initialState);
    component.loadConfig();
    expect(component.config).toEqual(initialState.config);
  });
});
