import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core'
import { MatButton, MatIconButton } from '@angular/material/button'
import { MatDialog, MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog'
import { MatIcon } from '@angular/material/icon'
import { CdkTextareaAutosize } from '@angular/cdk/text-field'
import { MatCheckbox } from '@angular/material/checkbox'
import { MatDatepicker, MatDatepickerInput, MatDatepickerToggle } from '@angular/material/datepicker'
import { MatError, MatFormField, MatHint, MatLabel, MatSuffix } from '@angular/material/form-field'
import { MatInput } from '@angular/material/input'
import { MatOption, provideNativeDateAdapter } from '@angular/material/core'
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio'
import { MatSelect, MatSelectTrigger } from '@angular/material/select'
import { NotificationService } from '../../../../core/services/notification/notification.service'
import { map, Observable, of, startWith } from 'rxjs'
import { AsyncPipe } from '@angular/common'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'

import { MatListOption, MatSelectionList } from '@angular/material/list'
import { MatSlideToggle } from '@angular/material/slide-toggle'
import { MatSlider, MatSliderRangeThumb } from '@angular/material/slider'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { AddSelectDialogComponent } from '../add-select-dialog/add-select-dialog.component'
import { CdkScrollable } from '@angular/cdk/scrolling'
import { MatAutocomplete, MatAutocompleteTrigger } from '@angular/material/autocomplete'
import {
    ModalFormAutoFocusDirective,
} from '../../../../shared/directives/modal-form-auto-focus/modal-form-auto-focus.directive'
import { FormErrorComponent } from '../../../../shared/components/form-error/form-error.component'
import {
    FormErrorPlaceholderComponent,
} from '../../../../shared/components/form-error-placeholder/form-error-placeholder.component'
import { FormButtonsComponent } from '../../../../shared/components/form-buttons/form-buttons.component'
import { CardComponent } from '../../../../shared/components/card/card.component'
import {
    FullscreenDialogContentComponent,
} from '../../../../shared/components/fullscreen-dialog-content/fullscreen-dialog-content.component'
import { fadeInAnimation } from '../../../../app.animations'
import { FormSectionComponent } from '../../../../shared/components/form-section/form-section.component'


@Component({
    selector: 'app-form-fullscreen-dialog-content',
    standalone: true,
    imports: [
        MatButton,
        MatIconButton,
        MatIcon,
        CdkTextareaAutosize,
        MatCheckbox,
        MatDatepicker,
        MatDatepickerInput,
        MatDatepickerToggle,
        MatFormField,
        MatHint,
        MatInput,
        MatLabel,
        MatOption,
        MatRadioButton,
        MatRadioGroup,
        MatSelect,
        MatSuffix,
        MatDatepicker,
        AsyncPipe,
        MatError,
        ReactiveFormsModule,
        ModalFormAutoFocusDirective,
        FormErrorComponent,
        FormErrorPlaceholderComponent,
        MatAutocomplete,
        MatAutocompleteTrigger,
        MatListOption,
        MatSelectTrigger,
        MatSelectionList,
        MatSlideToggle,
        MatSlider,
        MatSliderRangeThumb,
        CdkScrollable,

        MatDialogContent,

        FormButtonsComponent,
        CardComponent,
        FullscreenDialogContentComponent,
        FullscreenDialogContentComponent,
        MatDialogTitle,
        MatDialogActions,
        FormSectionComponent,
    ],
    providers: [provideNativeDateAdapter()],
    templateUrl: './form-fullscreen-dialog.component.html',
    styleUrl: './form-fullscreen-dialog.component.scss',
    animations: [fadeInAnimation],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFullscreenDialogComponent implements OnInit {
    private readonly dialogRef = inject(
        MatDialogRef<FormFullscreenDialogComponent>,
    )
    private readonly dialog = inject(MatDialog)
    private readonly notificationService = inject(NotificationService)

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
        slideToggles: new FormGroup({
            toggle1: new FormControl(false),
            toggle2: new FormControl(false),
        }),
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
                    this.dialogRef.close()
                    console.log(this.form.getRawValue())
                }
            }, 1000)
        } else {
            this.form.markAllAsTouched()
        }
    }

    closeDialog() {
        this.dialogRef.close()
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
                        this.selectOptions.update((values) => [
                            ...values,
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
