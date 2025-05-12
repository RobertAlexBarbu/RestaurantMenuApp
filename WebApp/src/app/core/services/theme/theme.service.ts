import { inject, Injectable } from '@angular/core'
import { UtilityService } from '../utility/utility.service'

@Injectable({
    providedIn: 'root',
})
export class ThemeService {
    private readonly utilityService = inject(UtilityService)

    getColorBasedOnTheme(variableValue: string) {
        if (this.isLightTheme()) {
            return this.getLightVersionOfVariable(variableValue)
        } else {
            return this.getDarkVersionOfVariable(variableValue)
        }
    }

    getPrimaryColor() {
        const variableValue = this.accessCssVariable('--mat-sys-primary')
        return this.getColorBasedOnTheme(variableValue)
    }

    getOnSurfaceColor() {
        const variableValue = this.accessCssVariable('--mat-sys-on-surface')
        return this.getColorBasedOnTheme(variableValue)
    }

    getSurfaceColor() {
        const variableValue = this.accessCssVariable('--mat-sys-surface')
        return this.getColorBasedOnTheme(variableValue)
    }

    getBorderColor() {
        const variableValue = this.accessCssVariable('--mat-sys-outline-variant')
        return this.getColorBasedOnTheme(variableValue)
    }

    getTertiaryColor() {
        const variableValue = this.accessCssVariable('--mat-sys-tertiary')
        return this.getColorBasedOnTheme(variableValue)
    }

    getLightVersionOfVariable(variableValue: string) {
        console.log(variableValue)
        const matches = variableValue.match(/#([a-fA-F0-9]{6})/g)
        const colorLight = matches![0]
        const colorDark = matches![1]
        if (this.utilityService.detectForcedDarkMode()) {
            return colorDark
        }
        return colorLight
    }

    getDarkVersionOfVariable(variableValue: string) {
        const matches = variableValue.match(/#([a-fA-F0-9]{6})/g)
        const colorLight = matches![0]
        const colorDark = matches![1]
        return colorDark
    }

    accessCssVariable(variableName: string) {
        const root = document.documentElement
        const styles = getComputedStyle(root)
        const variableValue = styles.getPropertyValue(variableName).trim()
        return variableValue
    }

    isLightTheme() {
        const theme = localStorage.getItem('theme')
        if (theme === 'light' || theme === null) {
            return true
        } else {
            return false
        }
    }

    setLightTheme() {
        localStorage.setItem('theme', 'light')
        document.body.classList.remove('dark-theme')
        document.body.classList.add('light-theme')
        const metaThemeColor = document.querySelector(
            'meta[name="theme-color"]',
        )!
        const colorLight = this.getSurfaceColor()
        document.body.style.backgroundColor = colorLight
        metaThemeColor.setAttribute('content', colorLight)
    }

    setDarkTheme() {
        localStorage.setItem('theme', 'dark')
        document.body.classList.remove('light-theme')
        document.body.classList.add('dark-theme')
        const metaThemeColor = document.querySelector(
            'meta[name="theme-color"]',
        )!
        const colorDark = this.getSurfaceColor()
        document.body.style.backgroundColor = colorDark
        metaThemeColor.setAttribute('content', colorDark)
    }
}
