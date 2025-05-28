import {Component, DestroyRef, inject, signal} from '@angular/core';
import {NgTemplateOutlet} from "@angular/common";
import {ToolbarComponent} from "../../shared/components/toolbar/toolbar.component";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {UtilityService} from "../../core/services/utility/utility.service";
import {MatListOption, MatSelectionList, MatSelectionListChange} from "@angular/material/list";
import {MatSlideToggleChange} from "@angular/material/slide-toggle";
import {ErrorService} from "../../core/services/error/error.service";
import {ThemeService} from "../../core/services/theme/theme.service";
import {Router, RouterLink} from "@angular/router";
import {MenuService} from "../../core/http/services/menu-services/menu/menu.service";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MatStep, MatStepLabel, MatStepper, MatStepperNext, MatStepperPrevious} from "@angular/material/stepper";
import {zip} from "rxjs";
import {MatButton} from "@angular/material/button";
import {MatError, MatFormField, MatInput, MatLabel} from "@angular/material/input";
import {MatIcon} from "@angular/material/icon";
import {CdkTextareaAutosize} from "@angular/cdk/text-field";
import {MenuStoreService} from "../../core/stores/menu-store/menu-store.service";

@Component({
  selector: 'app-review-feature',
    imports: [
        NgTemplateOutlet,
        ToolbarComponent,
        MatButton,
        MatStepper,
        MatStep,
        MatStepLabel,
        ReactiveFormsModule,
        MatFormField,
        MatInput,
        MatStepperPrevious,
        MatStepperNext,
        MatLabel,
        MatError,
        MatSelectionList,
        MatListOption,
        MatIcon,
        CdkTextareaAutosize,
        RouterLink
    ],
  templateUrl: './review-feature.component.html',
  styleUrl: './review-feature.component.scss',
    standalone: true
})
export class ReviewFeatureComponent {
    private readonly utilityService = inject(UtilityService)
    private readonly themeService = inject(ThemeService)
    private readonly errorService = inject(ErrorService)
    private readonly destroyRef = inject(DestroyRef)
    private readonly router = inject(Router)
    private readonly menuStore = inject(MenuStoreService);
    private readonly menuService = inject(MenuService);
    isMobile = this.utilityService.isMobile()
    url = this.menuStore.url();
    emailNotifications = true
    review = signal('Excellent')
    loadingGoToAppButton = signal(false)
    form = new FormGroup({
        name: new FormControl<string>('', {
            nonNullable: true,
        }),
        url: new FormControl<string>('',
            {
                nonNullable: true,
            },
        ),

    })

    constructor() {

    }

    setEmailNotifications(event: MatSlideToggleChange): void {
        this.emailNotifications = event.checked
    }

    changeReview(event: MatSelectionListChange): void {
        this.review.set(event.options[0].value)

    }
    
    message = new FormControl<string>('', {
        nonNullable: true,
    })

    setUpMenuNextLoading = signal(false)
    urlUnavailable = signal(false);
    reviewNext(stepper: MatStepper): void {
            this.setUpMenuNextLoading.set(true);
            this.menuService.createReview({
                menuId: this.menuStore.menu().id,
                rating: this.review(),
                message: this.message.getRawValue(),
                
            })
                .pipe(takeUntilDestroyed(this.destroyRef))
                .subscribe({
                    next: (val) => {
                        this.setUpMenuNextLoading.set(false);

                            stepper.next();

                    }
                })

        }
    


}
