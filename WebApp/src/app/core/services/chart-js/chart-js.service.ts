import { inject, Injectable } from '@angular/core'
import { Chart, registerables } from 'chart.js'
import Annotation from 'chartjs-plugin-annotation'
import { ThemeService } from '../theme/theme.service'
import { UtilityService } from '../utility/utility.service'

export interface ChartColor {
    lightColor: string
    darkColor: string
}

export class ChartColors {
    static Primary = 'primary'
    static Tertiary = 'tertiary'
    static OnSurface = 'onSurface'
    static Surface = 'surface'
    static Border = 'border'
    static Green = 'green'
    static Gray = 'gray'
    static Amber = 'amber'
    static Coral = 'coral'
    static Indigo = 'indigo'
}

@Injectable()
export class ChartJsService {
    private readonly themeService = inject(ThemeService)
    private readonly utilityService = inject(UtilityService)
    private isRegistered = false
    chartColors = new Map<string, ChartColor>([
        [
            ChartColors.Primary,
            {
                lightColor: this.themeService.getPrimaryColor(),
                darkColor: this.themeService.getPrimaryColor(),
            },
        ],
        [
            ChartColors.Tertiary,
            {
                lightColor: this.themeService.getTertiaryColor(),
                darkColor: this.themeService.getTertiaryColor(),
            },
        ],
        [
            ChartColors.OnSurface,
            {
                lightColor: this.themeService.getOnSurfaceColor(),
                darkColor: this.themeService.getOnSurfaceColor(),
            },
        ],
        [
            ChartColors.Surface,
            {
                lightColor: this.themeService.getSurfaceColor(),
                darkColor: this.themeService.getSurfaceColor(),
            },
        ],
        [
            ChartColors.Border,
            {
                lightColor: this.themeService.getBorderColor(),
                darkColor: this.themeService.getBorderColor(),
            },
        ],
        [
            ChartColors.Gray,
            {
                lightColor: '#737373',
                darkColor: '#d1d1d1',
            },
        ],
        [
            ChartColors.Green,
            {
                lightColor: '#00897b', // Teal (light)
                darkColor: '#26a69a', // Teal (dark)
            },
        ],
        [
            ChartColors.Amber,
            {
                lightColor: '#ffb300', // Amber (light)
                darkColor: '#ffcc80', // Amber (dark)
            },
        ],
        [
            ChartColors.Coral,
            {
                lightColor: '#ff6f61', // Coral
                darkColor: '#ffb3a8',
            },
        ],
        [
            ChartColors.Indigo,
            {
                lightColor: '#3f51b5', // Indigo
                darkColor: '#7986cb',
            },
        ],
    ])

    getColor(colorName: string) {
        if (this.chartColors.has(colorName)) {
            const color = this.chartColors.get(colorName)!
            if (this.themeService.isLightTheme()) {
                if (this.utilityService.detectForcedDarkMode()) {
                    return color.darkColor
                } else {
                    return color.lightColor
                }
            } else {
                return color.darkColor
            }
        } else {
            return this.themeService.getPrimaryColor()
        }
    }

    initializeChartJs(): void {
        if (!this.isRegistered) {
            Chart.register(...registerables, Annotation)
            this.isRegistered = true
            console.log('All Chart.js components registered!')
        }
    }
}
