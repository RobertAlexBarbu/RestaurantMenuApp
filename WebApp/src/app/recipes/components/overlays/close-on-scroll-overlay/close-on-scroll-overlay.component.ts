import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { MatButton } from '@angular/material/button'
import { CdkConnectedOverlay, CdkOverlayOrigin, Overlay, ScrollStrategy } from '@angular/cdk/overlay'

@Component({
    selector: 'app-close-on-scroll-overlay',
    standalone: true,
    imports: [MatButton, CdkConnectedOverlay, CdkOverlayOrigin],
    templateUrl: './close-on-scroll-overlay.component.html',
    styleUrl: './close-on-scroll-overlay.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CloseOnScrollOverlayComponent {
    private readonly overlay = inject(Overlay)
    isOpen = false
    closeScrollStrategy: ScrollStrategy

    constructor() {
        this.closeScrollStrategy = this.overlay.scrollStrategies.close()
    }

    onOverlayClose() {
        this.isOpen = false
    }
}
