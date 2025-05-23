import {ChangeDetectionStrategy, Component, DestroyRef, effect, inject, signal} from '@angular/core';
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatMenu, MatMenuItem} from "@angular/material/menu";
import {AsyncPipe, NgTemplateOutlet} from "@angular/common";
import {ToolbarComponent} from "../../../../shared/components/toolbar/toolbar.component";
import {CardComponent} from "../../../../shared/components/card/card.component";
import {MatSlideToggle, MatSlideToggleChange} from "@angular/material/slide-toggle";
import {pageLoadAnimation} from "../../../../app.animations";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatTimepicker, MatTimepickerInput, MatTimepickerToggle} from "@angular/material/timepicker";
import {provideNativeDateAdapter} from "@angular/material/core";
import {MenuDetailsService} from "../../../../core/http/services/menu-services/menu-details/menu-details.service";
import {MenuStoreService} from "../../services/menu-store/menu-store.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {NotificationService} from "../../../../core/services/notification/notification.service";
import {skip} from "rxjs";

@Component({
  selector: 'app-details-page',
    imports: [
        MatButton,
        MatIcon,
        MatIconButton,
        MatMenu,
        MatMenuItem,
        NgTemplateOutlet,
        ToolbarComponent,
        CardComponent,
        AsyncPipe,
        MatSlideToggle,
        MatProgressSpinner,
        MatFormField,
        ReactiveFormsModule,
        MatInput,
        MatLabel,
        MatError,
        MatTimepickerInput,
        MatTimepickerToggle,
        MatTimepicker
    ],
  templateUrl: './details-page.component.html',
  styleUrl: './details-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
    providers: [provideNativeDateAdapter()],
    animations: [pageLoadAnimation]
})
export class DetailsPageComponent {
    private readonly menuDetailService = inject(MenuDetailsService);
    private readonly destroyRef = inject(DestroyRef)
    private readonly menuStoreService = inject(MenuStoreService);
    private readonly notificationService = inject(NotificationService);
    wifiForm = new FormGroup({
        wifiNetworkName: new FormControl<string>('', {
            validators: [Validators.required],
            nonNullable: true
        }),
        wifiPassword: new FormControl<string>('', {
            validators: [Validators.required],
            nonNullable: true
        }),
    })
    disabledWifiSave = signal(true)
    updateWifiLoading = signal(false)
    saveWifiDetails() {
        if (this.wifiForm.invalid) {
            return;
        }
        this.updateWifiLoading.set(true);
        this.menuDetailService.updateById(this.menuStoreService.menuDetails().id, {...this.wifiForm.getRawValue()})
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
                next: value => {
                    this.updateWifiLoading.set(false);
                    this.disabledWifiSave.set(true);
                    this.menuStoreService.updateMenuDetails({...this.wifiForm.getRawValue()})
                    this.notificationService.notify('Wifi details updated successfully.');
                }
            })
    }
    wifiVisible = signal(false);
    updateWifiVisibility(event: MatSlideToggleChange) {
        this.wifiVisible.set(event.checked);
        this.menuStoreService.updateMenuDetails({wifiNetworkVisible: event.checked})
        this.menuDetailService.updateById(this.menuStoreService.menuDetails().id, {
            wifiNetworkVisible: event.checked
        }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            
        })
    }

    
    contactForm = new FormGroup({
        phoneNumber: new FormControl('', {
            nonNullable: true
        }),
        email: new FormControl('', {
            nonNullable: true
        }),
    })
    disabledContactSave = signal(true)
    updateContactLoading = signal(false)
    saveContactDetails() {
        if (this.contactForm.invalid) {
            return;
        }
        this.updateContactLoading.set(true);
        this.menuDetailService.updateById(this.menuStoreService.menuDetails().id, {...this.contactForm.getRawValue()})
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
                next: value => {
                    this.updateContactLoading.set(false);
                    this.disabledContactSave.set(true);
                    this.menuStoreService.updateMenuDetails({...this.contactForm.getRawValue()})
                    this.notificationService.notify('Contact details updated successfully.');
                }
            })
    }
    contactVisible = signal(false);
    updateContactVisibility(event: MatSlideToggleChange) {
        this.contactVisible.set(event.checked);
        this.menuStoreService.updateMenuDetails({contactInformationVisibile: event.checked})
        this.menuDetailService.updateById(this.menuStoreService.menuDetails().id, {
            contactInformationVisibile: event.checked
        }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({

        })
    }
    
    
    addressForm = new FormGroup({
        street: new FormControl('', {
            nonNullable: true
        }),
        city: new FormControl('', {
            nonNullable: true
        }),
        state: new FormControl('', {
            nonNullable: true
        }),
        zipCode: new FormControl('', {
            nonNullable: true
        }),
    })
    disabledAddressSave = signal(true)
    updateAddressLoading = signal(false)
    saveAddressDetails() {
        if (this.addressForm.invalid) {
            return;
        }
        this.updateAddressLoading.set(true);
        this.menuDetailService.updateById(this.menuStoreService.menuDetails().id, {...this.addressForm.getRawValue()})
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
                next: value => {
                    this.updateAddressLoading.set(false);
                    this.disabledAddressSave.set(true);
                    this.menuStoreService.updateMenuDetails({...this.addressForm.getRawValue()})
                    this.notificationService.notify('Address details updated successfully.');
                }
            })
    }
    addressVisible = signal(false);
    updateAddressVisibility(event: MatSlideToggleChange) {
        this.addressVisible.set(event.checked);
        this.menuStoreService.updateMenuDetails({addressVisible: event.checked})
        this.menuDetailService.updateById(this.menuStoreService.menuDetails().id, {
           addressVisible: event.checked
        }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({

        })
    }
    
    openingHoursForm = new FormGroup({
        monFriOpen: new FormControl<Date | null>(null, [Validators.required]),
        monFriClose: new FormControl<Date | null>(null,  [Validators.required]),
        weekendOpen: new FormControl<Date | null>(null,[Validators.required]),
        weekendClose: new FormControl<Date | null>(null, [Validators.required]),
    })
    disabledOpeningHoursSave = signal(true)
    updateOpeningHoursLoading = signal(false)
    saveOpeningHoursDetails() {
        if (this.openingHoursForm.invalid) {
            return;
        }
        this.updateOpeningHoursLoading.set(true);
        this.menuDetailService.updateById(this.menuStoreService.menuDetails().id, {
            monFriClose:  this.dateToTimeString(this.openingHoursForm.getRawValue().monFriClose!),
            monFriOpen:  this.dateToTimeString(this.openingHoursForm.getRawValue().monFriOpen!),
            weekendClose:  this.dateToTimeString(this.openingHoursForm.getRawValue().weekendClose!),
            weekendOpen:  this.dateToTimeString(this.openingHoursForm.getRawValue().weekendOpen!)
        })
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
                next: value => {
                    this.updateOpeningHoursLoading.set(false);
                    this.disabledOpeningHoursSave.set(true);
                    this.menuStoreService.updateMenuDetails({
                        monFriClose:  this.dateToTimeString(this.openingHoursForm.getRawValue().monFriClose!),
                            monFriOpen:  this.dateToTimeString(this.openingHoursForm.getRawValue().monFriOpen!),
                            weekendClose:  this.dateToTimeString(this.openingHoursForm.getRawValue().weekendClose!),
                            weekendOpen:  this.dateToTimeString(this.openingHoursForm.getRawValue().weekendOpen!)
                    })
                    this.notificationService.notify('Opening hours updated successfully.');
                }
            })
    }
    timeStringToDate(timeString: string): Date {
        const [time, period] = timeString.split(' ');
        let [hours, minutes] = time.split(':').map(Number);

        // Convert to 24-hour format
        if (period === 'PM' && hours < 12) hours += 12;
        if (period === 'AM' && hours === 12) hours = 0;

        // Create date with today's date but specified time
        const date = new Date();
        date.setHours(hours, minutes, 0, 0);
        return date;
    }
    dateToTimeString(date: Date): string {
        let hours = date.getHours();
        const minutes = date.getMinutes();

        // Convert to 12-hour format
        const period = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours || 12; // Convert 0 to 12

        // Format minutes with leading zero
        const minutesStr = minutes.toString().padStart(2, '0');

        return `${hours}:${minutesStr} ${period}`;
    }
    openingHoursVisible = signal(false);
    updateOpeningHoursVisibility(event: MatSlideToggleChange) {
        this.openingHoursVisible.set(event.checked);
        this.menuStoreService.updateMenuDetails({openingHoursVisible: event.checked})
        this.menuDetailService.updateById(this.menuStoreService.menuDetails().id, {
            openingHoursVisible: event.checked
        }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({

        })
    }
    
    constructor() {
        const menuDetails = this.menuStoreService.menuDetails();
        this.wifiVisible.set(menuDetails.wifiNetworkVisible);
        this.contactVisible.set(menuDetails.contactInformationVisibile);
        this.addressVisible.set(menuDetails.addressVisible);
        this.openingHoursVisible.set(menuDetails.openingHoursVisible);
        this.wifiForm.patchValue(menuDetails);
        this.addressForm.patchValue(menuDetails);
        this.contactForm.patchValue(menuDetails);
        this.openingHoursForm.patchValue({
            monFriClose: this.timeStringToDate(menuDetails.monFriClose),
            monFriOpen: this.timeStringToDate(menuDetails.monFriOpen),
            weekendOpen: this.timeStringToDate(menuDetails.weekendOpen),
            weekendClose: this.timeStringToDate(menuDetails.weekendClose),
        });


        
        
    }
    
    ngAfterViewInit(): void {
        this.wifiForm.valueChanges.subscribe({
            next: (data) => {
                this.disabledWifiSave.set(false);
            }
        })
        this.contactForm.valueChanges.subscribe({
            next: (data) => {
                this.disabledContactSave.set(false);
            }
        })
        this.addressForm.valueChanges.subscribe({
            next: (data) => {
                this.disabledAddressSave.set(false);
            }
        })
        this.openingHoursForm.valueChanges.pipe().subscribe({
            next: (data) => {
                console.log(data);
                this.disabledOpeningHoursSave.set(false);
            }
        })
    }
    

}
