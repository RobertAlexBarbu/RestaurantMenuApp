import {Routes} from "@angular/router";

export const menuRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./menu-feature.component').then(m => m.MenuFeatureComponent),
        children: [
            {
                path: 'food',
                loadComponent: () => import('./components/food-page/food-page.component').then(m => m.FoodPageComponent),
            },
            {
                path: 'drinks',
                loadComponent: () => import('./components/drinks-page/drinks-page.component').then(m => m.DrinksPageComponent),
            }
        ]
    }
]