import { ChangeDetectionStrategy, Component } from '@angular/core';
import {CategoriesTableComponent} from "../categories-table/categories-table.component";

@Component({
  selector: 'app-drinks-categories-table',
    imports: [
        CategoriesTableComponent
    ],
  templateUrl: './drinks-categories-table.component.html',
  styleUrl: './drinks-categories-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class DrinksCategoriesTableComponent {

}
