import { Routes } from '@angular/router'

export const layoutFeatureRoutes: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./layout-feature.component').then(
                (m) => m.LayoutFeatureComponent,
            ),
        children: [
            {
                path: 'tabs',
                loadComponent: () =>
                    import('./components/tabs-page/tabs-page.component').then(
                        (m) => m.TabsPageComponent,
                    ),
                children: [
                    {
                        path: 'page1',
                        loadComponent: () =>
                            import(
                                './components/tab-1-page/tab-1-page.component'
                                ).then((m) => m.Tab1PageComponent),
                    },
                    {
                        path: 'page2',
                        loadComponent: () =>
                            import(
                                './components/tab-2-page/tab-2-page.component'
                                ).then((m) => m.Tab2PageComponent),
                    },
                    {
                        path: 'page3',
                        loadComponent: () =>
                            import(
                                './components/tab-3-page/tab-3-page.component'
                                ).then((m) => m.Tab3PageComponent),
                    },
                ],
            },
            {
                path: 'scroll',
                loadComponent: () =>
                    import(
                        './components/scroll-navigation-page/scroll-navigation-page.component'
                        ).then((m) => m.ScrollNavigationPageComponent),
            },
            {
                path: 'mobile',
                loadComponent: () =>
                    import(
                        './components/mobile-preview-page/mobile-preview-page.component'
                        ).then((m) => m.MobilePreviewPageComponent),
            },
        ],
    },
]
