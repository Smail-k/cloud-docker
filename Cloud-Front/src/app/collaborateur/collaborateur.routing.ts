import { Routes } from '@angular/router';

import { CollaborateurComponent } from './collaborateur.component';


export const DashboardsRoutes: Routes = [
    {
      path: '',
      children: [
        {
          path: 'liste',
          component: CollaborateurComponent,
          data: {
            title: 'Collaborateur',
            urls: [{ title: 'Collaborateur', url: '/liste' }, { title: 'Liste' }],
          },
        }
      ],
    },
  ];
  