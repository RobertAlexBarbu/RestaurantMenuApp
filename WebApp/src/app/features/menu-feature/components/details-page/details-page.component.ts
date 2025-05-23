import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
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
        MatError
    ],
  templateUrl: './details-page.component.html',
  styleUrl: './details-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
    animations: [pageLoadAnimation]
})
export class DetailsPageComponent {
    wifiForm = new FormGroup({
        wifiNetworkName: new FormControl<string>('', [Validators.required]),
        wifiPassword: new FormControl<string>('', [Validators.required]),
    })
    disabledWifiSave = signal(true)
    updateWifiLoading = signal(false)
    saveWifiDetails() {
        if (this.wifiForm.invalid) {
            return;
        }
    }

    
    contactForm = new FormGroup({
        phoneNumber: new FormControl(''),
        email: new FormControl(''),
        facebookUrl: new FormControl(''),
        tiktokUrl: new FormControl(''),
    })
    disabledContactSave = signal(true)
    updateContactLoading = signal(false)
    saveContactDetails() {
        if (this.wifiForm.invalid) {
            return;
        }
    }
    
    addressForm = new FormGroup({
        street: new FormControl(''),
        city: new FormControl(''),
        state: new FormControl(''),
        zipCode: new FormControl(''),
    })
    disabledAddressSave = signal(true)
    updateAddressLoading = signal(false)
    saveAddressDetails() {
        if (this.wifiForm.invalid) {
            return;
        }
    }
    
    constructor() {
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
        
    }
    

}
