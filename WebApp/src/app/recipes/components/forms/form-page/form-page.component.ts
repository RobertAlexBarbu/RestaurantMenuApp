import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core'
import { MatFormField, MatFormFieldModule, MatHint, MatLabel } from '@angular/material/form-field'
import { MatInput, MatInputModule } from '@angular/material/input'
import { MatButton, MatIconButton } from '@angular/material/button'
import { MatOption, MatSelect, MatSelectTrigger } from '@angular/material/select'
import {
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerModule,
    MatDatepickerToggle,
} from '@angular/material/datepicker'
import { provideNativeDateAdapter } from '@angular/material/core'
import { MatCheckbox } from '@angular/material/checkbox'
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio'
import { NotificationService } from '../../../../core/services/notification/notification.service'
import { map, Observable, of, startWith } from 'rxjs'
import { AsyncPipe } from '@angular/common'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'

import { fadeInAnimation } from '../../../../app.animations'
import { MatListOption, MatSelectionList } from '@angular/material/list'
import { MatSlideToggle } from '@angular/material/slide-toggle'
import { MatAutocomplete, MatAutocompleteTrigger } from '@angular/material/autocomplete'
import { MatIcon } from '@angular/material/icon'
import { MatDialog } from '@angular/material/dialog'
import { AddSelectDialogComponent } from '../add-select-dialog/add-select-dialog.component'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import {
    FormErrorPlaceholderComponent,
} from '../../../../shared/components/form-error-placeholder/form-error-placeholder.component'
import { MatSlider, MatSliderRangeThumb } from '@angular/material/slider'
import { FormAutoFocusDirective } from '../../../../shared/directives/form-auto-focus/form-auto-focus.directive'
import { FormErrorComponent } from '../../../../shared/components/form-error/form-error.component'
import { FormButtonsComponent } from '../../../../shared/components/form-buttons/form-buttons.component'
import { CardComponent } from '../../../../shared/components/card/card.component'


@Component({
    selector: 'app-form-page',
    standalone: true,
    imports: [
        MatFormField,
        MatInput,
        MatLabel,
        MatButton,
        MatSelect,
        MatOption,
        MatDatepickerInput,
        MatDatepickerToggle,
        MatDatepicker,
        MatHint,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatCheckbox,
        MatRadioGroup,
        MatRadioButton,
        AsyncPipe,
        ReactiveFormsModule,
        FormAutoFocusDirective,

        MatListOption,
        MatSelectionList,
        MatSlideToggle,
        MatSelectTrigger,
        MatAutocompleteTrigger,
        MatAutocomplete,
        MatIcon,
        FormErrorComponent,
        FormErrorPlaceholderComponent,
        MatSlider,
        MatSliderRangeThumb,
        MatIconButton,
        FormButtonsComponent,
        CardComponent,
    ],
    providers: [provideNativeDateAdapter()],
    templateUrl: './form-page.component.html',
    styleUrl: './form-page.component.scss',
    animations: [fadeInAnimation],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormPageComponent implements OnInit {
    private readonly notificationService = inject(NotificationService)
    private readonly dialog = inject(MatDialog)
    // Form Fields
    form = new FormGroup({
        input1: new FormControl('', Validators.required),
        input2: new FormControl('', Validators.required),
        autocomplete: new FormControl(''),
        select: new FormControl('', Validators.required),
        multipleSelect: new FormControl(''),
        date: new FormControl('', Validators.required),
        radio: new FormControl('1', Validators.required),
        checkboxes: new FormGroup({
            checkbox1: new FormControl(false),
            checkbox2: new FormControl(false),
            checkbox3: new FormControl(false),
        }),
        checkboxList: new FormControl(),
        radioList: new FormControl(),
        textarea: new FormControl('', Validators.required),
        range: new FormGroup({
            range1: new FormControl(200),
            range2: new FormControl(400),
        }),
        requiredCheckbox: new FormControl(false, Validators.requiredTrue),
    })
    loading = signal(false)
    shake = signal(false)
    // Select Fields
    selectOptions = signal<string[]>([])
    // Autocomplete Fields
    filteredOptions!: Observable<string[]>
    autocompleteOptions: string[] = [
        'Apple',
        'Banana',
        'Cherry',
        'Dragonfruit',
        'Elderberry',
        'Fig',
        'Grape',
        'Honeydew',
        'Indian Fig',
        'Jackfruit',
    ]

    constructor() {
        // Select Code
        of([
            'Option1',
            'Option2',
            'Option3',
            'Option4',
            'Option5',
            'Option6',
            'Option7',
            'Option8',
            'Option9',
            'Option10',
        ])
            .pipe(takeUntilDestroyed())
            .subscribe({
                next: (value) => {
                    this.selectOptions.set(value)
                },
            })
    }

    ngOnInit() {
        // Autocomplete Code
        this.filteredOptions =
            this.form.controls.autocomplete.valueChanges.pipe(
                startWith(''),
                map((value) => this._filter(value || '')),
            )
    }

    // Form Methods
    submit() {
        if (this.form.valid) {
            this.loading.set(true)
            setTimeout(() => {
                this.loading.set(false)
                if (this.form.getRawValue().radio === '2') {
                    this.notificationService.notify(
                        'Error when submitting form!',
                    )
                    this.shake.set(true)
                    setTimeout(() => {
                        this.shake.set(false)
                    }, 500)
                } else {
                    this.notificationService.notify(
                        'Form Submitted Successfully',
                    )
                    console.log(this.form.getRawValue())
                }
            }, 1000)
        } else {
            this.form.markAllAsTouched()
            return
        }
    }

    // Select Methods
    openDialog(): void {
        const dialogRef = this.dialog.open(AddSelectDialogComponent, {
            autoFocus: false,
        })
        dialogRef.afterClosed().subscribe({
            next: (result) => {
                if (result) {
                    if (result.data) {
                        this.selectOptions.update((value) => [
                            ...value,
                            result.data.optionName,
                        ])
                        this.form.controls.select.setValue(
                            result.data.optionName,
                        )
                    }
                }
            },
        })
    }

    // Autocomplete Methods
    _filter(value: string): string[] {
        const filterValue = value.toLowerCase()
        return this.autocompleteOptions.filter((option) =>
            option.toLowerCase().includes(filterValue),
        )
    }
}
