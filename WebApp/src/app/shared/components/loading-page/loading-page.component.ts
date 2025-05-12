import { ChangeDetectionStrategy, Component } from '@angular/core'
import { AsyncPipe } from '@angular/common'
import { BehaviorSubject } from 'rxjs'
import { MatProgressBar } from '@angular/material/progress-bar'
import { LogoComponent } from '../logo/logo.component'
import { AppData } from '../../configs/AppData'

@Component({
    selector: 'app-loading-page',
    standalone: true,
    imports: [AsyncPipe, MatProgressBar, LogoComponent],
    templateUrl: './loading-page.component.html',
    styleUrl: './loading-page.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingPageComponent {
    show$ = new BehaviorSubject<boolean>(false)

    constructor() {
        setTimeout(() => {
            this.show$.next(true)
        }, 200)
    }

    protected readonly AppData = AppData
}
