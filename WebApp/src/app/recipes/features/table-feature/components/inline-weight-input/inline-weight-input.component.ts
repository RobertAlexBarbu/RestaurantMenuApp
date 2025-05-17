import { ChangeDetectionStrategy, Component, effect, inject, input, signal } from '@angular/core'
import { FormControl, ReactiveFormsModule } from '@angular/forms'
import { debounceTime, switchMap } from 'rxjs'
import { MatFormField } from '@angular/material/form-field'
import { MatInput } from '@angular/material/input'
import { MatProgressSpinner } from '@angular/material/progress-spinner'

import { MatIcon } from '@angular/material/icon'
import { ElementService } from '../../../../../core/http/services/element/element.service'
import { ElementDto } from '../../../../../core/http/dto/element/element.dto'
import { TableFeatureStore } from '../../../../stores/table-feature.store'

@Component({
    selector: 'app-inline-weight-input',
    imports: [
        MatFormField,
        MatInput,
        MatProgressSpinner,
        ReactiveFormsModule,
        MatIcon,
    ],
    templateUrl: './inline-weight-input.component.html',
    styleUrl: './inline-weight-input.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
})
export class InlineWeightInputComponent {
    private readonly tableFeatureStore = inject(TableFeatureStore)
    private readonly elementService = inject(ElementService)
    protected readonly FormControl = FormControl
    element = input.required<ElementDto>()
    localWeight = signal<number>(0)
    loading = signal<boolean>(false)
    form = new FormControl<number>(0, {
        nonNullable: true,
    })

    constructor() {
        console.log('Rerender?')
        effect(() => {
            this.localWeight.set(this.element().weight)

            this.form.setValue(this.localWeight(), { emitEvent: false }) // don't trigger valueChanges

        })
        this.form.valueChanges.pipe(debounceTime(500),
            switchMap(value => {
                this.loading.set(true)
                return this.elementService.updateWeightById(this.element().id, { weight: value ? value : 0 })
            }))
            .subscribe({
                next: () => {
                    this.loading.set(false)
                    this.tableFeatureStore.updateElementWeightById(this.element().id, { weight: this.form.getRawValue() })
                },
            })
    }
}
