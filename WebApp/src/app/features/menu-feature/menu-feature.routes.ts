import {Routes} from "@angular/router";
import {MenuFeatureStore} from "../../core/stores/menu-feature.store";

export const routes: Routes = [
  {
    path: "",
    loadComponent: () => import("./menu-feature.component").then(m => m.MenuFeatureComponent),
    children: [
      {
        path: "food",
        loadComponent: () => import("./components/food-page/food-page.component").then(m => m.FoodPageComponent),
        children: [
          {
            path: "items",
            loadComponent: () => import("./components/food-items-table/food-items-table.component").then(m => m.FoodItemsTableComponent),
          },
          {
            path: "categories",
            loadComponent: () => import("./components/food-categories-table/food-categories-table.component").then(m => m.FoodCategoriesTableComponent),
          }
        ]
      },
      {
        path: "drinks",
        loadComponent: () => import("./components/drinks-page/drinks-page.component").then(m => m.DrinksPageComponent),
        children: [
          {
            path: "items",
            loadComponent: () => import("./components/drinks-items-table/drinks-items-table.component").then(m => m.DrinksItemsTableComponent),
          },
          {
            path: "categories",
            loadComponent: () => import("./components/drinks-categories-table/drinks-categories-table.component").then(m => m.DrinksCategoriesTableComponent),
          }
        ]
      },
      {
        path: 'details',
        loadComponent: () => import("./components/details-page/details-page.component").then(m => m.DetailsPageComponent),
      }
    ]
  }
]
