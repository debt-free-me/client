import { Component, OnInit, OnDestroy } from '@angular/core';
import { Styles } from 'jss';
import { createStyleSheet } from '../../utils/jss.util';
import { BasePage } from '../base/base.page';
import { NgRedux } from '@angular-redux/store';
import { AppState } from 'src/app/typings/state.typing';

export const styles: Styles = {
  ionImage: {
    maxHeight: '35vh',
    overflow: 'hidden',
  },
};

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  // styleUrls: ['tab1.page.scss'],
})
export class Tab1Page extends BasePage implements OnInit, OnDestroy {

  constructor(ngRedux: NgRedux<AppState>) {
    super(ngRedux);
  }

  ngOnInit() {
    this.styleSheet = createStyleSheet(styles);
  }

  ngOnDestroy() {
    this.styleSheet.detach();
  }
}
