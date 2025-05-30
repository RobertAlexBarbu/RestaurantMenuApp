import { Routes } from '@angular/router';

import {AppComponent} from "./app.component";
import {MainFeatureComponent} from "./features/main-feature/main-feature.component";
import {mainRoutes} from "./features/main-feature/main.routes";

export const routes: Routes = [
    {
        path: '',
        children: mainRoutes,
        data: { renderMode: 'server' }
    }
    
];
