import { Routes } from '@angular/router'



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
            path: 'menu',
            loadChildren: () => import("../menu-feature/menu-feature.routes").then(m => m.routes)
          },
            {
                path: 'analytics',
                loadComponent: () => import('../analytics-feature/analytics-feature.component').then(m => m.AnalyticsFeatureComponent),
            },
            {
                path: 'style',
                loadComponent: () => import('../style-feature/style-feature.component').then(m => m.StyleFeatureComponent),
            },
            {
                path: 'reviews',
                loadComponent: () => import('../reviews-feature/reviews-feature.component').then(m => m.ReviewsFeatureComponent),
            },
            
            {
                path: 'debug',
                loadComponent: () =>
                    import(
                        '../debug-feature/debug-feature.component'
                        ).then((m) => m.DebugFeatureComponent),
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


