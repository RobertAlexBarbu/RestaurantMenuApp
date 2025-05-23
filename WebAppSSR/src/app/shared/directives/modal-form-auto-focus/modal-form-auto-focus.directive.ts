import { Directive, ElementRef, inject } from '@angular/core'

@Directive({
    selector: '[appModalFormAutoFocus]',
    standalone: true,
    exportAs: 'appModalFormAutoFocus',
})
export class ModalFormAutoFocusDirective {
    private readonly el = inject(ElementRef)

    public focus(): void {
        const invalidControl =
            this.el.nativeElement.querySelector('.ng-invalid')
        if (invalidControl) {
            invalidControl.focus()
            invalidControl.scrollIntoView({ behavior: 'smooth' })
        }
    }
}
