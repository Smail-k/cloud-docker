import { Routes } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';

export const AppRoutes: Routes = [
    {
        path: '',
        component: FullComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                redirectTo: '/login',
                pathMatch: 'full'
            },
            {
                path: 'material',
                loadChildren: () => import('./material-component/material.module').then(m => m.MaterialComponentsModule)
            },
            {
                path: 'starter',
                loadChildren: () => import('./starter/starter.module').then(m => m.StarterModule)
            },
            {
                path: 'starter-collaborateur',
                loadChildren: () => import('./starter-collaborateur/starter-collaborateur.module').then(m => m.StarterCollaborateurModule)
            },
            {
                path: 'starter-manager',
                loadChildren: () => import('./starter-manager/starter-manager.module').then(m => m.StarterManagerModule)
            },
            {
                path: 'projet',
                loadChildren: () => import('./projet/projet.module').then(m => m.ProjetModule)
            },
            {
                path: 'collaborateur',
                loadChildren: () => import('./collaborateur/collaborateur.module').then(m => m.CollaborateurModule)
            },
            {
                path: 'manager',
                loadChildren: () => import('./manager/manager.module').then(m => m.ManagerModule)
            },
            {
                path: 'tache',
                loadChildren: () => import('./tache/tache.module').then(m => m.TacheModule)
            },
            {
                path: 'affectation',
                loadChildren: () => import('./affectation/affectation.module').then(m => m.AffectationModule)
            },

        ]
    },
    {
        path: 'login',
        component: LoginComponent,
    }
];
