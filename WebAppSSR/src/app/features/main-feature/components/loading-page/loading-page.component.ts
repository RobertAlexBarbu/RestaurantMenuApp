import {Component, input} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {MatProgressBar} from "@angular/material/progress-bar";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-loading-page',
    imports: [
        MatProgressBar,
        AsyncPipe
    ],
  templateUrl: './loading-page.component.html',
  styleUrl: './loading-page.component.scss',
    standalone: true
})
export class LoadingPageComponent {
    show$ = new BehaviorSubject<boolean>(false)
    restaurantName = input.required<string>();

    constructor() {
        setTimeout(() => {
            this.show$.next(true)
        }, 200)
    }
}
