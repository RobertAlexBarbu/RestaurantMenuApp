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
        MatSelectionList
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
    private readonly menuService = inject(MenuService)
    private readonly destroyRef = inject(DestroyRef);
    private readonly notificationService = inject(NotificationService)
    private readonly menuAnalyticsService = inject(MenuAnalyticsService)
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

    colorChanged(event: string) {
       this.colorForm.patchValue(event);
    }
    saveColorStyles() {
        if (this.colorForm.invalid) {
            this.colorForm.markAllAsTouched();
            return;
        } else {
            console.log(this.colorForm.value);
            this.notificationService.notify('Theme color updated successfully.');
            this.disabledColorSave.set(true);
        }
    }
    hexColorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    ngAfterViewInit() {
        this.colorForm.valueChanges.subscribe({
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
    font = signal<string>('Roboto');
    
    changeFont(event:MatSelectionListChange) {
        let font = event.options[0].value;
        this.disabledFontSave.set(false);
        this.font.set(font);
        
    }
    disabledFontSave = signal(true)
    updateFontLoading = signal(false)

    saveFontStyles() {
            console.log(this.font());
            this.notificationService.notify('Font updated successfully.');
            this.disabledFontSave.set(true);
        
    }
    
    constructor() {
        const sourceColor = argbFromHex('#326b00'); // or any color
        const theme = themeFromSourceColor(sourceColor);
        const sourceHct = Hct.fromInt(sourceColor);
        const sourceHue = sourceHct.hue;

        // Extract light and dark scheme colors
        const lightScheme = theme.schemes.light;
        const darkScheme = theme.schemes.dark;
        // Helper function to create neutral surface colors
        const createNeutralSurface = (isLight: boolean, tone: number) => {
            // Use very low chroma (saturation) for neutral surfaces
            const hct = Hct.from(sourceHue, 4, tone);
            return hexFromArgb(hct.toInt());
        };

        // Helper function to safely get color or fallback
        // @ts-ignore
        const getColor = (scheme: any, property: string, fallback: string) => {
            return scheme[property] ? hexFromArgb(scheme[property]) : fallback;
        };

        // Create more neutral surface colors
        const neutralSurfaces = {
            light: {
                surface: createNeutralSurface(true, 98),
                surfaceContainer: createNeutralSurface(true, 94),
                surfaceContainerHigh: createNeutralSurface(true, 92),
                surfaceContainerHighest: createNeutralSurface(true, 90),
                surfaceContainerLow: createNeutralSurface(true, 96),
                surfaceContainerLowest: createNeutralSurface(true, 100),
                surfaceDim: createNeutralSurface(true, 87),
                surfaceBright: createNeutralSurface(true, 98),
            },
            dark: {
                surface: createNeutralSurface(false, 10),
                surfaceContainer: createNeutralSurface(false, 12),
                surfaceContainerHigh: createNeutralSurface(false, 17),
                surfaceContainerHighest: createNeutralSurface(false, 22),
                surfaceContainerLow: createNeutralSurface(false, 10),
                surfaceContainerLowest: createNeutralSurface(false, 4),
                surfaceDim: createNeutralSurface(false, 6),
                surfaceBright: createNeutralSurface(false, 24),
            }
        };

        const themeCSS = `
 --mat-sys-background: light-dark(${hexFromArgb(lightScheme.background)}, ${hexFromArgb(darkScheme.background)});
        --mat-sys-error: light-dark(${hexFromArgb(lightScheme.error)}, ${hexFromArgb(darkScheme.error)});
        --mat-sys-error-container: light-dark(${hexFromArgb(lightScheme.errorContainer)}, ${hexFromArgb(darkScheme.errorContainer)});
        --mat-sys-inverse-on-surface: light-dark(${hexFromArgb(lightScheme.inverseOnSurface)}, ${hexFromArgb(darkScheme.inverseOnSurface)});
        --mat-sys-inverse-primary: light-dark(${hexFromArgb(lightScheme.inversePrimary)}, ${hexFromArgb(darkScheme.inversePrimary)});
        --mat-sys-inverse-surface: light-dark(${hexFromArgb(lightScheme.inverseSurface)}, ${hexFromArgb(darkScheme.inverseSurface)});
        --mat-sys-on-background: light-dark(${hexFromArgb(lightScheme.onBackground)}, ${hexFromArgb(darkScheme.onBackground)});
        --mat-sys-on-error: light-dark(${hexFromArgb(lightScheme.onError)}, ${hexFromArgb(darkScheme.onError)});
        --mat-sys-on-error-container: light-dark(${hexFromArgb(lightScheme.onErrorContainer)}, ${hexFromArgb(darkScheme.onErrorContainer)});
        --mat-sys-on-primary: light-dark(${hexFromArgb(lightScheme.onPrimary)}, ${hexFromArgb(darkScheme.onPrimary)});
        --mat-sys-on-primary-container: light-dark(${hexFromArgb(lightScheme.onPrimaryContainer)}, ${hexFromArgb(darkScheme.onPrimaryContainer)});
        --mat-sys-on-primary-fixed: light-dark(${getColor(lightScheme, 'onPrimaryFixed', hexFromArgb(lightScheme.onPrimaryContainer))}, ${getColor(darkScheme, 'onPrimaryFixed', hexFromArgb(darkScheme.onPrimaryContainer))});
        --mat-sys-on-primary-fixed-variant: light-dark(${getColor(lightScheme, 'onPrimaryFixedVariant', hexFromArgb(lightScheme.onPrimary))}, ${getColor(darkScheme, 'onPrimaryFixedVariant', hexFromArgb(darkScheme.onPrimary))});
        --mat-sys-on-secondary: light-dark(${hexFromArgb(lightScheme.onSecondary)}, ${hexFromArgb(darkScheme.onSecondary)});
        --mat-sys-on-secondary-container: light-dark(${hexFromArgb(lightScheme.onSecondaryContainer)}, ${hexFromArgb(darkScheme.onSecondaryContainer)});
        --mat-sys-on-secondary-fixed: light-dark(${getColor(lightScheme, 'onSecondaryFixed', hexFromArgb(lightScheme.onSecondaryContainer))}, ${getColor(darkScheme, 'onSecondaryFixed', hexFromArgb(darkScheme.onSecondaryContainer))});
        --mat-sys-on-secondary-fixed-variant: light-dark(${getColor(lightScheme, 'onSecondaryFixedVariant', hexFromArgb(lightScheme.onSecondary))}, ${getColor(darkScheme, 'onSecondaryFixedVariant', hexFromArgb(darkScheme.onSecondary))});
        --mat-sys-on-surface: light-dark(${hexFromArgb(lightScheme.onSurface)}, ${hexFromArgb(darkScheme.onSurface)});
        --mat-sys-on-surface-variant: light-dark(${hexFromArgb(lightScheme.onSurfaceVariant)}, ${hexFromArgb(darkScheme.onSurfaceVariant)});
        --mat-sys-on-tertiary: light-dark(${hexFromArgb(lightScheme.onTertiary)}, ${hexFromArgb(darkScheme.onTertiary)});
        --mat-sys-on-tertiary-container: light-dark(${hexFromArgb(lightScheme.onTertiaryContainer)}, ${hexFromArgb(darkScheme.onTertiaryContainer)});
        --mat-sys-on-tertiary-fixed: light-dark(${getColor(lightScheme, 'onTertiaryFixed', hexFromArgb(lightScheme.onTertiaryContainer))}, ${getColor(darkScheme, 'onTertiaryFixed', hexFromArgb(darkScheme.onTertiaryContainer))});
        --mat-sys-on-tertiary-fixed-variant: light-dark(${getColor(lightScheme, 'onTertiaryFixedVariant', hexFromArgb(lightScheme.onTertiary))}, ${getColor(darkScheme, 'onTertiaryFixedVariant', hexFromArgb(darkScheme.onTertiary))});
        --mat-sys-outline: light-dark(${hexFromArgb(lightScheme.outline)}, ${hexFromArgb(darkScheme.outline)});
        --mat-sys-outline-variant: light-dark(${hexFromArgb(lightScheme.outlineVariant)}, ${hexFromArgb(darkScheme.outlineVariant)});
        --mat-sys-primary: light-dark(${hexFromArgb(lightScheme.primary)}, ${hexFromArgb(darkScheme.primary)});
        --mat-sys-primary-container: light-dark(${hexFromArgb(lightScheme.primaryContainer)}, ${hexFromArgb(darkScheme.primaryContainer)});
        --mat-sys-primary-fixed: light-dark(${getColor(lightScheme, 'primaryFixed', hexFromArgb(lightScheme.primaryContainer))}, ${getColor(darkScheme, 'primaryFixed', hexFromArgb(darkScheme.primaryContainer))});
        --mat-sys-primary-fixed-dim: light-dark(${getColor(lightScheme, 'primaryFixedDim', hexFromArgb(lightScheme.primary))}, ${getColor(darkScheme, 'primaryFixedDim', hexFromArgb(darkScheme.primary))});
        --mat-sys-scrim: light-dark(${hexFromArgb(lightScheme.scrim)}, ${hexFromArgb(darkScheme.scrim)});
        --mat-sys-secondary: light-dark(${hexFromArgb(lightScheme.secondary)}, ${hexFromArgb(darkScheme.secondary)});
        --mat-sys-secondary-container: light-dark(${hexFromArgb(lightScheme.secondaryContainer)}, ${hexFromArgb(darkScheme.secondaryContainer)});
        --mat-sys-secondary-fixed: light-dark(${getColor(lightScheme, 'secondaryFixed', hexFromArgb(lightScheme.secondaryContainer))}, ${getColor(darkScheme, 'secondaryFixed', hexFromArgb(darkScheme.secondaryContainer))});
        --mat-sys-secondary-fixed-dim: light-dark(${getColor(lightScheme, 'secondaryFixedDim', hexFromArgb(lightScheme.secondary))}, ${getColor(darkScheme, 'secondaryFixedDim', hexFromArgb(darkScheme.secondary))});
        --mat-sys-shadow: light-dark(${hexFromArgb(lightScheme.shadow)}, ${hexFromArgb(darkScheme.shadow)});
        --mat-sys-surface: light-dark(${neutralSurfaces.light.surface}, ${neutralSurfaces.dark.surface});
        --mat-sys-surface-bright: light-dark(${neutralSurfaces.light.surfaceBright}, ${neutralSurfaces.dark.surfaceBright});
        --mat-sys-surface-container: light-dark(${neutralSurfaces.light.surfaceContainer}, ${neutralSurfaces.dark.surfaceContainer});
        --mat-sys-surface-container-high: light-dark(${neutralSurfaces.light.surfaceContainerHigh}, ${neutralSurfaces.dark.surfaceContainerHigh});
        --mat-sys-surface-container-highest: light-dark(${neutralSurfaces.light.surfaceContainerHighest}, ${neutralSurfaces.dark.surfaceContainerHighest});
        --mat-sys-surface-container-low: light-dark(${neutralSurfaces.light.surfaceContainerLow}, ${neutralSurfaces.dark.surfaceContainerLow});
        --mat-sys-surface-container-lowest: light-dark(${neutralSurfaces.light.surfaceContainerLowest}, ${neutralSurfaces.dark.surfaceContainerLowest});
        --mat-sys-surface-dim: light-dark(${neutralSurfaces.light.surfaceDim}, ${neutralSurfaces.dark.surfaceDim});
        --mat-sys-surface-tint: light-dark(${getColor(lightScheme, 'surfaceTint', hexFromArgb(lightScheme.primary))}, ${getColor(darkScheme, 'surfaceTint', hexFromArgb(darkScheme.primary))});
        --mat-sys-surface-variant: light-dark(${hexFromArgb(lightScheme.surfaceVariant)}, ${hexFromArgb(darkScheme.surfaceVariant)});
        --mat-sys-tertiary: light-dark(${hexFromArgb(lightScheme.tertiary)}, ${hexFromArgb(darkScheme.tertiary)});
        --mat-sys-tertiary-container: light-dark(${hexFromArgb(lightScheme.tertiaryContainer)}, ${hexFromArgb(darkScheme.tertiaryContainer)});
        --mat-sys-tertiary-fixed: light-dark(${getColor(lightScheme, 'tertiaryFixed', hexFromArgb(lightScheme.tertiaryContainer))}, ${getColor(darkScheme, 'tertiaryFixed', hexFromArgb(darkScheme.tertiaryContainer))});
        --mat-sys-tertiary-fixed-dim: light-dark(${getColor(lightScheme, 'tertiaryFixedDim', hexFromArgb(lightScheme.tertiary))}, ${getColor(darkScheme, 'tertiaryFixedDim', hexFromArgb(darkScheme.tertiary))});

    `;

        // Add the theme CSS to a style element
        const style = document.createElement('style');
        style.textContent = `:root { ${themeCSS} }`;
        document.head.appendChild(style);
    }
    
    openPreviewDialog() {
        this.dialog.open(StylePreviewDialogComponent, {
            ...fullscreenDialogConfig,
                viewContainerRef: this.viewContainerRef
        })
    }
}
