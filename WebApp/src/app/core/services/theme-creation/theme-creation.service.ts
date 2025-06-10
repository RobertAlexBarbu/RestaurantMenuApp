import { Injectable } from '@angular/core';
import {argbFromHex, Hct, hexFromArgb, themeFromSourceColor} from "@material/material-color-utilities";

@Injectable({
  providedIn: 'root'
})
export class ThemeCreationService {

  constructor() { }
    
    createThemeCss(color: string) {
        const sourceColor = argbFromHex(color); // or any color
        const theme = themeFromSourceColor(sourceColor);
        const sourceHct = Hct.fromInt(sourceColor);
        const sourceHue = sourceHct.hue;

        // Extract light and dark scheme colors
        const lightScheme = theme.schemes.light;
        const darkScheme = theme.schemes.dark;
        const createNeutralSurface = (isLight: boolean, tone: number) => {
            // Use very low chroma (saturation) for neutral surfaces
            const hct = Hct.from(sourceHue, 4, tone);
            return hexFromArgb(hct.toInt());
        };
        
        // @ts-ignore
        const getColor = (scheme: any, property: string, fallback: string) => {
            return scheme[property] ? hexFromArgb(scheme[property]) : fallback;
        };


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
        return themeCSS;
    }
    createFontCss(font: string) {
        const cssString = `
    --mat-sys-body-large: 400 1rem / 1.5rem Roboto;
    --mat-sys-body-large-font: Roboto;
    --mat-sys-body-large-line-height: 1.5rem;
    --mat-sys-body-large-size: 1rem;
    --mat-sys-body-large-tracking: 0.031rem;
    --mat-sys-body-large-weight: 400;
    --mat-sys-body-medium: 400 0.875rem / 1.25rem Roboto;
    --mat-sys-body-medium-font: Roboto;
    --mat-sys-body-medium-line-height: 1.25rem;
    --mat-sys-body-medium-size: 0.875rem;
    --mat-sys-body-medium-tracking: 0.016rem;
    --mat-sys-body-medium-weight: 400;
    --mat-sys-body-small: 400 0.75rem / 1rem Roboto;
    --mat-sys-body-small-font: Roboto;
    --mat-sys-body-small-line-height: 1rem;
    --mat-sys-body-small-size: 0.75rem;
    --mat-sys-body-small-tracking: 0.025rem;
    --mat-sys-body-small-weight: 400;
    --mat-sys-display-large: 400 3.562rem / 4rem Roboto;
    --mat-sys-display-large-font: Roboto;
    --mat-sys-display-large-line-height: 4rem;
    --mat-sys-display-large-size: 3.562rem;
    --mat-sys-display-large-tracking: -0.016rem;
    --mat-sys-display-large-weight: 400;
    --mat-sys-display-medium: 400 2.812rem / 3.25rem Roboto;
    --mat-sys-display-medium-font: Roboto;
    --mat-sys-display-medium-line-height: 3.25rem;
    --mat-sys-display-medium-size: 2.812rem;
    --mat-sys-display-medium-tracking: 0;
    --mat-sys-display-medium-weight: 400;
    --mat-sys-display-small: 400 2.25rem / 2.75rem Roboto;
    --mat-sys-display-small-font: Roboto;
    --mat-sys-display-small-line-height: 2.75rem;
    --mat-sys-display-small-size: 2.25rem;
    --mat-sys-display-small-tracking: 0;
    --mat-sys-display-small-weight: 400;
    --mat-sys-headline-large: 400 2rem / 2.5rem Roboto;
    --mat-sys-headline-large-font: Roboto;
    --mat-sys-headline-large-line-height: 2.5rem;
    --mat-sys-headline-large-size: 2rem;
    --mat-sys-headline-large-tracking: 0;
    --mat-sys-headline-large-weight: 400;
    --mat-sys-headline-medium: 400 1.75rem / 2.25rem Roboto;
    --mat-sys-headline-medium-font: Roboto;
    --mat-sys-headline-medium-line-height: 2.25rem;
    --mat-sys-headline-medium-size: 1.75rem;
    --mat-sys-headline-medium-tracking: 0;
    --mat-sys-headline-medium-weight: 400;
    --mat-sys-headline-small: 400 1.5rem / 2rem Roboto;
    --mat-sys-headline-small-font: Roboto;
    --mat-sys-headline-small-line-height: 2rem;
    --mat-sys-headline-small-size: 1.5rem;
    --mat-sys-headline-small-tracking: 0;
    --mat-sys-headline-small-weight: 400;
    --mat-sys-label-large: 500 0.875rem / 1.25rem Roboto;
    --mat-sys-label-large-font: Roboto;
    --mat-sys-label-large-line-height: 1.25rem;
    --mat-sys-label-large-size: 0.875rem;
    --mat-sys-label-large-tracking: 0.006rem;
    --mat-sys-label-large-weight: 500;
    --mat-sys-label-large-weight-prominent: 700;
    --mat-sys-label-medium: 500 0.75rem / 1rem Roboto;
    --mat-sys-label-medium-font: Roboto;
    --mat-sys-label-medium-line-height: 1rem;
    --mat-sys-label-medium-size: 0.75rem;
    --mat-sys-label-medium-tracking: 0.031rem;
    --mat-sys-label-medium-weight: 500;
    --mat-sys-label-medium-weight-prominent: 700;
    --mat-sys-label-small: 500 0.688rem / 1rem Roboto;
    --mat-sys-label-small-font: Roboto;
    --mat-sys-label-small-line-height: 1rem;
    --mat-sys-label-small-size: 0.688rem;
    --mat-sys-label-small-tracking: 0.031rem;
    --mat-sys-label-small-weight: 500;
    --mat-sys-title-large: 400 1.375rem / 1.75rem Roboto;
    --mat-sys-title-large-font: Roboto;
    --mat-sys-title-large-line-height: 1.75rem;
    --mat-sys-title-large-size: 1.375rem;
    --mat-sys-title-large-tracking: 0;
    --mat-sys-title-large-weight: 400;
    --mat-sys-title-medium: 500 1rem / 1.5rem Roboto;
    --mat-sys-title-medium-font: Roboto;
    --mat-sys-title-medium-line-height: 1.5rem;
    --mat-sys-title-medium-size: 1rem;
    --mat-sys-title-medium-tracking: 0.009rem;
    --mat-sys-title-medium-weight: 500;
    --mat-sys-title-small: 500 0.875rem / 1.25rem Roboto;
    --mat-sys-title-small-font: Roboto;
    --mat-sys-title-small-line-height: 1.25rem;
    --mat-sys-title-small-size: 0.875rem;
    --mat-sys-title-small-tracking: 0.006rem;
    --mat-sys-title-small-weight: 500;
  `;

        // Replace all instances of 'Roboto' with the specified font
        return cssString.replace(/Roboto/g, font);
    }
}
