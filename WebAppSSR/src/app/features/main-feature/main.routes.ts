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
            }
        ]
    },

]