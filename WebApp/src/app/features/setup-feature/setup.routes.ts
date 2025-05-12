import { Routes } from '@angular/router'

export const setupRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./setup-feature.component').then(
            m => m.SetupFeatureComponent,
        ),
    },
]