import { ChangeDetectionStrategy, Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { pageLoadAnimation } from '../../app.animations'

@Component({
    selector: 'app-auth-feature',
    standalone: true,
    imports: [RouterOutlet],
    templateUrl: './auth-feature.component.html',
    styleUrl: './auth-feature.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [pageLoadAnimation],
})
export class AuthFeatureComponent {
}
