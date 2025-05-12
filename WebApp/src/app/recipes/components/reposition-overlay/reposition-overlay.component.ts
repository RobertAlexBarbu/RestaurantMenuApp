import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Renderer2, viewChild } from '@angular/core'
import { CdkConnectedOverlay, CdkOverlayOrigin } from '@angular/cdk/overlay'
import { MatButton } from '@angular/material/button'

@Component({
    selector: 'app-reposition-overlay',
    standalone: true,
    imports: [CdkConnectedOverlay, CdkOverlayOrigin, MatButton],
    templateUrl: './reposition-overlay.component.html',
    styleUrl: './reposition-overlay.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RepositionOverlayComponent {
    private globalClickListener: (() => void) | null = null
    isOpen = false
    readonly overlayPane = viewChild.required<ElementRef>('overlayPane')

    constructor(
        private renderer: Renderer2,
        private elRef: ElementRef,
        private cdr: ChangeDetectorRef,
    ) {
    }

    toggleOverlay() {
        this.isOpen = !this.isOpen
        if (this.isOpen) {
            this.startListeningForClicks()
        } else {
            this.stopListeningForClicks()
        }
    }

    private startListeningForClicks() {
        if (!this.globalClickListener) {
            this.globalClickListener = this.renderer.listen(
                'document',
                'click',
                this.onDocumentClick.bind(this),
            )
        }
    }

    private stopListeningForClicks() {
        if (this.globalClickListener) {
            this.globalClickListener() // Removes the listener
            this.globalClickListener = null
        }
    }

    private onDocumentClick(event: MouseEvent) {
        const overlayPaneElement = this.overlayPane()?.nativeElement
        if (
            overlayPaneElement &&
            !overlayPaneElement.contains(event.target as Node)
        ) {
            this.isOpen = false
            this.cdr.detectChanges()
            this.stopListeningForClicks()
        }
    }
}
