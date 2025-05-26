import {Routes} from "@angular/router";
import {MainFeatureComponent} from "./main-feature.component";
import {HomePageComponent} from "./components/home-page/home-page.component";

export const mainRoutes: Routes = [
    {
        path: ":url",
        component: MainFeatureComponent,
        children: [
            {
                path: '',
                component: HomePageComponent,
            },
            {
                path: 'menu',
                loadChildren: () => import('../menu-feature/menu-feature.routes').then(m => m.menuRoutes)
            },
            {
                path: 'chat',
                loadComponent: () => import('../chat-feature/chat-feature.component').then(m => m.ChatFeatureComponent),
             },
            {
                path: 'review',
                loadComponent: () => import('../review-feature/review-feature.component').then(m => m.ReviewFeatureComponent)
            }
        ]
    },
    {
        path: "qr/:id",
        component: MainFeatureComponent,
        children: [
            {
                path: '',
                component: HomePageComponent,
            },
            {
                path: 'menu',
                loadChildren: () => import('../menu-feature/menu-feature.routes').then(m => m.menuRoutes)
            }
        ]
    },

]