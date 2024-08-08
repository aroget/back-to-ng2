import { Routes } from '@angular/router';
import { SimpleComponent } from './simple/simple.component';
import { FunComponent } from './fun/fun.component';
import { Simple2Component } from './simple-2/simple-2.component';

export const routes: Routes = [
  { path: 'simple', component: SimpleComponent },
  { path: 'simple-2', component: Simple2Component },
  { path: 'fun', component: FunComponent },
];
