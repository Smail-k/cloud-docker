import { Routes } from '@angular/router';

import { ManagerComponent } from './manager.component';


export const DashboardsRoutes: Routes = [
    {
      path: '',
      children: [
        {
          path: 'liste',
          component: ManagerComponent,
          data: {
            title: 'Manager',
            urls: [{ title: 'Manager', url: '/liste' }, { title: 'Liste' }],
          },
        }
      ],
    },
  ];
  