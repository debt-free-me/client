import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfigLoadGuard } from './guards/config-load.guard';

const routes: Routes = [{
  path: '',
  loadChildren: './pages/tabs/tabs.module#TabsPageModule',
  canActivate: [ConfigLoadGuard],
}];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
