import { Routes } from '@angular/router';

import { ProjetComponent } from './projet.component';


export const DashboardsRoutes: Routes = [
    {
      path: '',
      children: [
        {
          path: 'liste',
          component: ProjetComponent,
          data: {
            title: 'Projet',
            urls: [{ title: 'Projet', url: '/liste' }, { title: 'Liste' }],
          },
        }
      ],
    },
  ];
  