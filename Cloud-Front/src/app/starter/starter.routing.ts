import { Routes } from '@angular/router';

import { StarterComponent } from './starter.component';

export const StarterRoutes: Routes = [
  {
    path: '',
    component: StarterComponent,
	data: {
      title: 'Dashboard Page',
      urls: [
        { title: 'Dashboard', url: '/dashboard' },
        { title: 'Dashboard Page' }
      ]
    }
  }
];
