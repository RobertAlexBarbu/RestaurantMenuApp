import {
    ChangeDetectionStrategy,
    Component,
    computed,
    DestroyRef,
    inject,
    signal, viewChild,
    ViewContainerRef
} from '@angular/core';
import {ToolbarComponent} from "../../shared/components/toolbar/toolbar.component";
import {QrGeneratorComponent} from "../../recipes/components/qr-generator/qr-generator.component";
import {RightSidebarComponent} from "../../shared/components/right-sidebar/right-sidebar.component";
import {PhoneComponent} from "../../shared/components/phone/phone.component";
import {CardComponent} from "../../shared/components/card/card.component";
import {pageLoadAnimation} from "../../app.animations";
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {AppStore} from "../../core/stores/app.store";
import {EnvironmentService} from "../../core/services/environment/environment.service";
import {MenuService} from "../../core/http/services/menu-services/menu/menu.service";
import {NotificationService} from "../../core/services/notification/notification.service";
import {MenuAnalyticsService} from "../../core/http/services/menu-services/menu-analytics/menu-analytics.service";
import {MatDialog} from "@angular/material/dialog";
import {StylePreviewDialogComponent} from "./components/style-preview-dialog/style-preview-dialog.component";
import {fullscreenDialogConfig} from "../../shared/configs/dialogs.config";
import {argbFromHex, Hct, hexFromArgb, themeFromSourceColor} from "@material/material-color-utilities";
import {NgxColorsComponent, NgxColorsModule} from "ngx-colors";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {
    FormErrorPlaceholderComponent
} from "../../shared/components/form-error-placeholder/form-error-placeholder.component";
import {hexColorValidator} from "../../shared/validators/hexColorValidator";
import {AsyncPipe} from "@angular/common";
import {MatListOption, MatSelectionList, MatSelectionListChange} from "@angular/material/list";
import {FeatureLoadingPageComponent} from "../../shared/components/feature-loading-page/feature-loading-page.component";
import {MenuStyleService} from "../../core/http/services/menu-services/menu-style/menu-style.service";
import {ThemeCreationService} from "../../core/services/theme-creation/theme-creation.service";
import {skip, takeUntil} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {MenuStyleDto} from "../../core/http/dto/menu-dto/menu-style/menu-style.dto";

@Component({
  selector: 'app-style-feature',
    imports: [
        ToolbarComponent,
        QrGeneratorComponent,
        RightSidebarComponent,
        PhoneComponent,
        CardComponent,
        MatButton,
        MatIcon,
        NgxColorsModule,
        MatFormField,
        MatInput,
        MatLabel,
        ReactiveFormsModule,
        FormsModule,
        FormErrorPlaceholderComponent,
        MatError,
        AsyncPipe,
        MatListOption,
        MatSelectionList,
        FeatureLoadingPageComponent
    ],
  templateUrl: './style-feature.component.html',
  styleUrl: './style-feature.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    animations: [pageLoadAnimation]
})
export class StyleFeatureComponent {
    private readonly appStore = inject(AppStore)
    private readonly environmentService = inject(EnvironmentService)
    private readonly themeCreationService = inject(ThemeCreationService)
    private readonly destroyRef = inject(DestroyRef);
    private readonly notificationService = inject(NotificationService)
    private readonly menuStyleService = inject(MenuStyleService)
    private readonly dialog = inject(MatDialog)
    private readonly viewContainerRef = inject(ViewContainerRef);
    menu = this.appStore.user.menu;
    ssrUrl = this.environmentService.getSsrUrl();
    completeUrl = computed(() => this.ssrUrl + '/' + this.menu.url())
    
    colorForm = new FormControl("", [Validators.required, hexColorValidator()]);
    disabledColorSave = signal(true)
    updateColorLoading = signal(false)
    colorPicker = viewChild(NgxColorsComponent);
    colorAux = ''
    loading = signal(true);

    colorChanged(event: string) {
       this.colorForm.patchValue(event);
    }
    saveColorStyles() {
        if (this.colorForm.invalid) {
            this.colorForm.markAllAsTouched();
            return;
        } else {
            this.updateColorLoading.set(true);
            this.menuStyleService.updateById(this.menuStyle.id, {
                themeColor: this.colorForm.value!,
                themeCss: this.themeCreationService.createThemeCss( this.colorForm.value!)
            }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
                next: value => {
                    this.notificationService.notify('Theme color updated successfully.');
                    this.disabledColorSave.set(true);
                    this.updateColorLoading.set(false);
                    this.phone()?.reload()
                }
            })
        }
    }
    
    reloadPreview() {
        this.phone()?.reload()
    }
    hexColorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    ngAfterViewInit() {

    }
    font = signal<string>('Roboto');
    
    changeFont(event:MatSelectionListChange) {
        let font = event.options[0].value;
        this.disabledFontSave.set(false);
        this.font.set(font);
        
    }
    disabledFontSave = signal(true)
    updateFontLoading = signal(false)

    saveFontStyles() {
        this.updateFontLoading.set(true);
        this.menuStyleService.updateById(this.menuStyle.id, {
            font: this.font(),
            fontCss: this.themeCreationService.createFontCss(this.font())
        }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: value => {
                this.notificationService.notify('Font updated successfully.');
                this.disabledFontSave.set(true);
                this.updateFontLoading.set(false);
                this.phone()?.reload()


            }
        })

        
    }
    phone = viewChild(PhoneComponent)
    menuStyle!: MenuStyleDto;
    constructor() {
       this.menuStyleService.getByMenuId(this.appStore.user.menu.id())
           .pipe(takeUntilDestroyed(this.destroyRef))
           .subscribe({
               next: (val) => {
                   this.menuStyle = val;
                   console.log(val);
                   this.font.set(val.font);
                   this.colorForm.setValue(val.themeColor);
                   this.colorAux = val.themeColor;
                   this.loading.set(false);
                   this.colorForm.valueChanges.pipe(
                       takeUntilDestroyed(this.destroyRef),
                   ).subscribe({
                       next: (data) => {

                           if (data) {
                               if(this.hexColorRegex.test(data)) {
                                   const cp = this.colorPicker();
                                   this.colorAux = data;
                               }
                           }

                           this.disabledColorSave.set(false);
                       }
                   })
               }
           })
    }
    
    openPreviewDialog() {
        this.dialog.open(StylePreviewDialogComponent, {
            ...fullscreenDialogConfig,
                viewContainerRef: this.viewContainerRef
        })
    }
}
