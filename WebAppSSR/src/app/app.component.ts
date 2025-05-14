import {Component, inject} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatButton} from "@angular/material/button";
import {MenuService} from "./core/http/services/menu/menu.service";

@Component({
  selector: 'app-root',
    imports: [RouterOutlet, MatButton],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
    standalone: true
})
export class AppComponent {
  title = 'WebAppSSR';
}
