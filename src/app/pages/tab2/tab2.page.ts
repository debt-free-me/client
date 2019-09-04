import { Component, OnInit, OnDestroy } from '@angular/core';
import { PhotoService } from '../../services/photo.service';
import { NgRedux, select } from '@angular-redux/store';
import { Observable, Subscription } from 'rxjs';
import { Styles } from 'jss';
import { takePhoto } from 'src/app/actions/tab2.action';
import { AppState, Tab2State } from 'src/app/typings/state.typing';
import { BasePage } from '../base/base.page';
import { FeatureType } from 'src/app/typings/feature.typing';
import { createStyleSheet } from 'src/app/utils/jss.util';

export const variableStyles: Record<string, any> = {
  cameraIcon: {
    backgroundColor: data => data.cameraIcon.backgroundColor,
  },
};

export const styles: Record<string, any> = {

};

export const cameraEnabledStyles: Styles = {
  cameraIcon: {
    backgroundColor: 'blue',
  },
};

export const cameraDisabledStyles: Styles = {
  cameraIcon: {
    backgroundColor: 'red',
  },
};

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  // styleUrls: ['tab2.page.scss'],
})
export class Tab2Page extends BasePage implements OnInit, OnDestroy {
  @select((state: AppState) => state.tab2) tab2$: Observable<Tab2State>;

  currentImage: any;
  count: number;
  isLoading: boolean;
  stateSubscription: Subscription;

  constructor(
    ngRedux: NgRedux<AppState>,
    public photoService: PhotoService
  ) {
    super(ngRedux);
    const initialStyles = {
      ...styles,
      ...variableStyles,
    };
    this.styleSheet = createStyleSheet(initialStyles);
    this.onConfigLoad();
  }

  ngOnInit() {
    this.photoService.loadSaved();
    this.stateSubscription = this.tab2$.subscribe(
      (tab2State: Tab2State) => {
        this.count = tab2State.count;
        this.isLoading = tab2State.isLoading;
      });
  }

  onConfigLoad() {
    const cameraStyles = this.isFeatureOn(FeatureType.Camera) ?
      cameraEnabledStyles : cameraDisabledStyles;
    this.styleSheet = this.styleSheet.update(cameraStyles);
  }

  onCameraClick() {
    this.photoService.takePicture();
    this.ngRedux.dispatch(takePhoto());
  }

  ngOnDestroy() {
    this.stateSubscription.unsubscribe();
  }

}
