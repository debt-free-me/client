import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfigGuard } from './guards/config.guard';

const routes: Routes = [{
  path: '',
  loadChildren: './pages/tabs/tabs.module#TabsPageModule',
  // canActivate: [ConfigGuard],
}];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
