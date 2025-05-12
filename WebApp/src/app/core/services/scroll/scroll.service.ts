import { inject, Injectable } from '@angular/core'
import { UtilityService } from '../utility/utility.service'


@Injectable({
    providedIn: 'root',
})
export class ScrollService {
    private readonly utilityService = inject(UtilityService)
    readonly mainContainerId = 'main'

    scrollTo(y: number, id = this.mainContainerId) {
        const element = document.getElementById(id)
        if (element) {
            element.scrollTo({
                top: y,
                behavior: 'smooth',
            })
        }
    }

    scrollTop(smooth = false, id = this.mainContainerId) {
        const element = document.getElementById(id)
        const isMobile = this.utilityService.isMobile()
        if (element) {
            if (isMobile) {
                element.style.overflow = 'hidden'
            }
            element.scrollTo({
                top: 0,
                left: 0,
                behavior: smooth ? 'smooth' : 'auto',
            })
            if (isMobile) {
                element.style.overflow = 'auto'
            }
        }
    }

    scrollBy(y: number, id = 'main') {
        const element = document.getElementById(id)
        if (element) {
            element.scrollBy({
                top: y,
                behavior: 'smooth',
            })
        }
    }

    scrollBottom(smooth = false, id = this.mainContainerId) {
        const element = document.getElementById(id)
        const isMobile = this.utilityService.isMobile()
        if (element) {
            if (isMobile) {
                element.style.overflow = 'hidden'
            }
            element.scrollTo({
                top: 99999,
                left: 0,
                behavior: smooth ? 'smooth' : 'auto',
            })
            if (isMobile) {
                element.style.overflow = 'auto'
            }
        }
    }

    scrollDialogBottom(smooth = true) {
        const elements = document.getElementsByClassName('mat-mdc-dialog-surface mdc-dialog__surface')
        const isMobile = this.utilityService.isMobile()
        if (elements.length > 0) {
            const element = elements[0] as HTMLElement // Get first matching element

            if (isMobile) {
                element.style.overflow = 'hidden'
            }

            element.scrollTo({
                top: 99999,
                left: 0,
                behavior: smooth ? 'smooth' : 'auto',
            })

            if (isMobile) {
                element.style.overflow = 'auto'
            }
        }
    }

    scrollDialogContentTop(smooth = true, index = 0) {
        const elements = document.getElementsByClassName('mat-mdc-dialog-content')
        const isMobile = this.utilityService.isMobile()
        if (elements.length > 0) {
            const element = elements[index] as HTMLElement // Get first matching element

            if (isMobile) {
                element.style.overflow = 'hidden'
            }

            element.scrollTo({
                top: 0,
                left: 0,
                behavior: smooth ? 'smooth' : 'auto',
            })

            if (isMobile) {
                element.style.overflow = 'auto'
            }
        }
    }

    getCurrentScrollPosition(id = this.mainContainerId): number {
        const element = document.getElementById(id)
        if (element) {
            return element.scrollTop || 0
        }
        return 0
    }

}
