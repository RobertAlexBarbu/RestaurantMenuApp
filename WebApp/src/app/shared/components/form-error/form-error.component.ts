import { ChangeDetectionStrategy, Component } from '@angular/core'
import { slideDownErrorAnimation } from '../../../app.animations'

@Component({
    selector: 'app-form-error',
    standalone: true,
    imports: [],
    templateUrl: './form-error.component.html',
    styleUrl: './form-error.component.scss',
    animations: [slideDownErrorAnimation],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormErrorComponent {
}
