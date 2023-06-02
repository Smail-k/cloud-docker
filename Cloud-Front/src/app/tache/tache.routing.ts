import { Routes } from '@angular/router';

import { TacheComponent } from './tache.component';


export const DashboardsRoutes: Routes = [
    {
      path: '',
      children: [
        {
          path: 'liste',
          component: TacheComponent,
          data: {
            title: 'Tache',
            urls: [{ title: 'Tache', url: '/liste' }, { title: 'Liste' }],
          },
        }
      ],
    },
  ];
  