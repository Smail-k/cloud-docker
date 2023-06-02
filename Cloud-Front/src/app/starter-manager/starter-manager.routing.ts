import { Routes } from '@angular/router';
import { StarterManagerComponent } from './starter-manager.component';



export const StarterRoutes: Routes = [
  {
    path: '',
    component: StarterManagerComponent,
	data: {
      title: 'Dashboard Page',
      urls: [
        { title: 'Dashboard', url: '/dashboard' },
        { title: 'Dashboard Page' }
      ]
    }
  }
];
