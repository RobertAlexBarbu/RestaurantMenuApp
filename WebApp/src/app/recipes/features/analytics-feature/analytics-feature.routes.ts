import { Routes } from '@angular/router'

export const analyticsFeatureRoutes: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./analytics-feature.component').then(
                (m) => m.AnalyticsFeatureComponent,
            ),
        children: [
            {
                path: 'basic',
                loadComponent: () =>
                    import(
                        './components/basic-charts-page/basic-charts-page.component'
                        ).then((m) => m.BasicChartsPageComponent),
            },
            {
                path: 'advanced',
                loadComponent: () =>
                    import(
                        './components/advanced-chart-page/advanced-chart-page.component'
                        ).then((m) => m.AdvancedChartPageComponent),
            },
            {
                path: '**',
                pathMatch: 'full',
                redirectTo: 'basic',
            },
        ],
    },
]
