import { Directive, ElementRef, inject, input, OnChanges, OnDestroy, output } from '@angular/core'
import { DomSanitizer, SafeHtml } from '@angular/platform-browser'


@Directive({
    selector: '[appTypewriter]',
    standalone: true,
})
export class TypewriterDirective implements OnChanges, OnDestroy {
    private readonly sanitizer = inject(DomSanitizer)
    private readonly elementRef = inject(ElementRef)

    cancelTyping = false
    typingPromise: Promise<void> | null = null
    appTypewriter = input<SafeHtml | string>('')
    speed = input(10)
    startDelay = input(300)
    pauseBetweenElements = input(10)
    typingComplete = output()
    typingInterrupted = output()


    ngOnChanges() {
        this.cancelTyping = true
        if (this.typingPromise) {
            this.typingPromise.then(() => {
                this.startTyping()
            })
        } else {
            this.startTyping()
        }
    }

    ngOnDestroy() {
        this.cancelTyping = true
    }

    public stopTyping() {
        this.cancelTyping = true
        this.typingInterrupted.emit()
    }

    private async startTyping() {
        this.cancelTyping = false
        this.elementRef.nativeElement.innerHTML = ''

        const htmlString = typeof this.appTypewriter() === 'string'
            ? this.appTypewriter()
            : this.sanitizer.sanitize(1, this.appTypewriter()) || ''

        await new Promise(resolve => setTimeout(resolve, this.startDelay()))

        if (this.cancelTyping) return

        const tempDiv = document.createElement('div')
        if (typeof htmlString === 'string') {
            tempDiv.innerHTML = htmlString
        }

        this.typingPromise = this.processNodes(tempDiv, this.elementRef.nativeElement)
        await this.typingPromise

        if (!this.cancelTyping) {
            this.typingComplete.emit()
        }
    }

    private async processNodes(source: Node, target: HTMLElement) {
        for (const child of Array.from(source.childNodes)) {
            if (this.cancelTyping) break

            if (child.nodeType === Node.TEXT_NODE) {
                await this.typeText(child.textContent || '', target)
            } else if (child.nodeType === Node.ELEMENT_NODE) {
                const clone = child.cloneNode() as HTMLElement
                target.appendChild(clone)

                if (child.childNodes.length > 0) {
                    await this.processNodes(child, clone)
                }

                if (!this.cancelTyping) {
                    await new Promise(resolve => setTimeout(resolve, this.pauseBetweenElements()))
                }
            }
        }
    }

    private async typeText(text: string, parent: HTMLElement) {
        const textNode = document.createTextNode('')
        parent.appendChild(textNode)
        for (let i = 0; i < text.length; i++) {
            if (this.cancelTyping) break
            textNode.nodeValue = text.substring(0, i + 1)
            await new Promise(resolve => setTimeout(resolve, this.speed()))
        }
    }
}