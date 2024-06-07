import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { PriceComponent } from '../main-components/price/price.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'price',
    component: PriceComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
