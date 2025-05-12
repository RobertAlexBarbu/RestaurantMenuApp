import { Routes } from '@angular/router'

export const tableFeatureRoutes: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./table-feature.component').then(
                (m) => m.TableFeatureComponent,
            ),
        children: [
            {
                path: 'elements',
                loadComponent: () =>
                    import(
                        './components/table-page/table-page.component'
                        ).then((m) => m.TablePageComponent),
            },
            {
                path: 'categories',
                loadComponent: () =>
                    import(
                        './components/table-categories-page/categories-table-page.component'
                        ).then((m) => m.CategoriesTablePageComponent),
            },
            {
                path: '**',
                pathMatch: 'full',
                redirectTo: 'elements',
            },
        ],
    },
]
