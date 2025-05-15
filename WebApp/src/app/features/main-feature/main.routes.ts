import { Routes } from '@angular/router'
import { isRoleGuard } from '../../core/guards/is-role/is-role.guard'
import { Roles } from '../../shared/configs/Roles'


export const mainRoutes: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./main-feature.component').then(
                (m) => m.MainFeatureComponent,
            ),
        children: [
            {
                path: '',
                loadComponent: () =>
                    import(
                        './components/home-page/home-page.component'
                        ).then((m) => m.HomePageComponent),
            },
            {
                path: 'basic',
                loadChildren: () =>
                    import(
                        '../../recipes/features/basic-feature/basic-feature.routes'
                        ).then((m) => m.basicFeatureRoutes),
            },
          {
            path: 'menu',
            loadChildren: () => import("../menu-feature/menu-feature.routes").then(m => m.routes)
          },
            {
                path: 'debug',
                loadComponent: () =>
                    import(
                        '../debug-feature/debug-feature.component'
                        ).then((m) => m.DebugFeatureComponent),
            },
            {
                path: 'admin',
                canActivate: [
                    isRoleGuard(Roles.Admin, '/private/main'),
                ],
                loadComponent: () =>
                    import(
                        '../../recipes/features/admin-feature/admin-feature.component'
                        ).then((m) => m.AdminFeatureComponent),
            },
            {
                path: 'table',
                loadChildren: () =>
                    import(
                        '../../recipes/features/table-feature/table-feature.routes'
                        ).then((m) => m.tableFeatureRoutes),
            },
            {
                path: 'analytics',
                loadChildren: () =>
                    import(
                        '../../recipes/features/analytics-feature/analytics-feature.routes'
                        ).then((m) => m.analyticsFeatureRoutes),
            },
            {
                path: 'layout',
                loadChildren: () =>
                    import(
                        '../../recipes/features/layout-feature/layout-feature.routes'
                        ).then((m) => m.layoutFeatureRoutes),
            },
            {
                path: 'settings',
                loadChildren: () =>
                    import(
                        '../settings-feature/settings-feature.routes'
                        ).then((m) => m.settingsFeatureRoutes),
            },
        ],
    },

]


