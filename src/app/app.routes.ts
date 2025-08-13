import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ApiDataComponent } from './components/api-data/api-data.component';
import { FormPageComponent } from './components/form-page/form-page.component';
import { AnalyticsComponent } from './components/analytics/analytics.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'users', component: ApiDataComponent }, // Changed from 'api-data' to 'users'
  { path: 'analytics', component: AnalyticsComponent }, // New analytics route
  { path: 'contact', component: FormPageComponent }, // Changed from 'form' to 'contact'
  // Keep old routes for backwards compatibility
  { path: 'api-data', redirectTo: 'users' },
  { path: 'form', redirectTo: 'contact' },
  { path: '**', redirectTo: '' }
];