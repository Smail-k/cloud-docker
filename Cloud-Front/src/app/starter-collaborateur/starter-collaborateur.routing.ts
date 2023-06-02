import { Routes } from '@angular/router';

import { StarterCollaborateurComponent } from './starter-collaborateur.component';

export const StarterRoutes: Routes = [
  {
    path: '',
    component: StarterCollaborateurComponent,
	data: {
      title: 'Dashboard Page',
      urls: [
        { title: 'Dashboard', url: '/dashboard' },
        { title: 'Dashboard Page' }
      ]
    }
  }
];
