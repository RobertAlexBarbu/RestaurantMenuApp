import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, DestroyRef,
    ElementRef, inject,
    input, OnInit,
    Renderer2, signal,
    viewChild
} from '@angular/core';
import {CdkConnectedOverlay, CdkOverlayOrigin} from "@angular/cdk/overlay";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {ImageComponent} from "../../../../shared/components/image/image.component";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {StorageService} from "../../../../core/services/storage/storage.service";

@Component({
  selector: 'app-item-image-button',
    imports: [CdkConnectedOverlay, CdkOverlayOrigin, MatIcon, MatIconButton, ImageComponent],
  templateUrl: './item-image-button.component.html',
  styleUrl: './item-image-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})
export class ItemImageButtonComponent {
    private globalClickListener: (() => void) | null = null
    isOpen = false
    imageUrl = input<string|null>(null)
    readonly overlayPane = viewChild.required<ElementRef>('overlayPane')
    firebaseFileUrl = signal<string | null>(null)
    private readonly storage = inject(StorageService)
    private readonly destroyRef = inject(DestroyRef)
    
    constructor(
        private renderer: Renderer2,
        private elRef: ElementRef,
        private cdr: ChangeDetectorRef,
    ) {
        const imgUrl = this.imageUrl();
        console.log(imgUrl);
        if (imgUrl) {
            this.storage
                .download(imgUrl)
                .pipe(takeUntilDestroyed(this.destroyRef))
                .subscribe({
                    next: (file) => {
                        this.firebaseFileUrl.set(URL.createObjectURL(file))
                    },
                })
        }
    }
    

    toggleOverlay() {
        this.isOpen = !this.isOpen
        if (this.isOpen) {
            const imgUrl = this.imageUrl();
            console.log(imgUrl);
            if (imgUrl) {
                this.storage
                    .download(imgUrl)
                    .pipe(takeUntilDestroyed(this.destroyRef))
                    .subscribe({
                        next: (file) => {
                            this.firebaseFileUrl.set(URL.createObjectURL(file))
                        },
                    })
            }
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
