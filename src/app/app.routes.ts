import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ApiDataComponent } from './components/api-data/api-data.component';
import { FormPageComponent } from './components/form-page/form-page.component';

export const routes: Routes = [
  { path: '', component: HomeComponent }, // Changed from redirect to direct component
  { path: 'home', component: HomeComponent },
  { path: 'api-data', component: ApiDataComponent },
  { path: 'form', component: FormPageComponent },
  { path: '**', redirectTo: '' }
];