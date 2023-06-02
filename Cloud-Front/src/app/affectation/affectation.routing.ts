import { Routes } from '@angular/router';

import { AffectationComponent } from './affectation.component';


export const DashboardsRoutes: Routes = [
    {
      path: '',
      children: [
        {
          path: 'liste',
          component: AffectationComponent,
          data: {
            title: 'Affecter Tache',
            urls: [{ title: 'Affecter Tache', url: '/liste' }, { title: 'Liste' }],
          },
        }
      ],
    },
  ];
  