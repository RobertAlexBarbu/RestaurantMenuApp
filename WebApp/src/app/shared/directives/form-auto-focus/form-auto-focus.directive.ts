import { Directive, ElementRef, inject } from '@angular/core'
import { ScrollService } from '../../../core/services/scroll/scroll.service'

@Directive({
    selector: '[appFormAutoFocus]',
    standalone: true,
    exportAs: 'appFormAutoFocus',
})
export class FormAutoFocusDirective {
    private readonly drawerContent = inject(ScrollService)
    private readonly el = inject(ElementRef)

    public focus(): void {
        const invalidControl =
            this.el.nativeElement.querySelector('.ng-invalid')
        if (invalidControl) {
            invalidControl.focus()
            const rect = invalidControl.getBoundingClientRect()
            this.drawerContent.scrollBy(rect.top - 120)
            // window.scrollBy({
            //     top: rect.top - 120,
            //     behavior: 'smooth',
            // })
        }
    }
}
