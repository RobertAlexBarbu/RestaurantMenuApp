import { Routes } from '@angular/router'

export const settingsFeatureRoutes: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./settings-feature.component').then(
                (m) => m.SettingsFeatureComponent,
            ),
        children: [
            {
                path: 'account',
                loadComponent: () =>
                    import(
                        './components/account-page/account-page.component'
                        ).then((m) => m.AccountPageComponent),
            },
            {
                path: 'billing',
                loadComponent: () =>
                    import(
                        './components/billing-page/billing-settings-page.component'
                        ).then((m) => m.BillingSettingsPageComponent),
            },
            {
                path: 'preferences',
                loadComponent: () =>
                    import('./components/preferences-page/preferences-page.component')
                        .then(m => m.PreferencesPageComponent),
            },
            {
                path: '**',
                pathMatch: 'full',
                redirectTo: 'account',
            },
        ],
    },
]
