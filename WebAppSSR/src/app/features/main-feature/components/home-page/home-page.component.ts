import { Component } from '@angular/core';
import {ToolbarComponent} from "../../../../shared/components/toolbar/toolbar.component";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-home-page',
    imports: [
        ToolbarComponent,
        MatButton
    ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
    standalone: true
})
export class HomePageComponent {

}
