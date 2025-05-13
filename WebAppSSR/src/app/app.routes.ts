import { Routes } from '@angular/router';

import {AppComponent} from "./app.component";
import {MainFeatureComponent} from "./features/main-feature/main-feature.component";

export const routes: Routes = [
    {
        path: ":url",
        component: MainFeatureComponent,
    },
    {
        path: "qr/:id",
        component: MainFeatureComponent,
        
    }
    
];
