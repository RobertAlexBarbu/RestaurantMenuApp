import { ChangeDetectionStrategy, Component, DestroyRef, effect, inject, input, signal } from '@angular/core'
import { NgIf } from '@angular/common'
import { MatButton } from '@angular/material/button'
import { forkJoin } from 'rxjs'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { QrService } from '../../../core/services/qr/qr.service'
import { UtilityService } from '../../../core/services/utility/utility.service'

@Component({
    selector: 'app-qr-generator',
    imports: [
        NgIf,
        MatButton,
    ],
    templateUrl: './qr-generator.component.html',
    styleUrl: './qr-generator.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
})
export class QrGeneratorComponent {
    private readonly destroyRef = inject(DestroyRef)
    private readonly qrService = inject(QrService)
    private readonly utilityService = inject(UtilityService)
    url = input.required<string>()
    qrName = input<string>('qr')
    pngUrl = signal<string>('')
    svgUrl = signal<string>('')

    constructor() {
        effect(() => {
            forkJoin({
                svgUrl: this.qrService.generateSvg(this.url()),
                pngUrl: this.qrService.generatePng(this.url()),
            }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
                next: (e) => {
                    this.svgUrl.set(e.svgUrl)
                    this.pngUrl.set(e.pngUrl)
                },
            })
        })
    }

    downloadSvg() {
        this.utilityService.downloadFile(this.svgUrl(), `${this.qrName()}.svg`)
    }

    downloadPng() {
        this.utilityService.downloadFile(this.pngUrl(), `${this.qrName()}.png`)
    }

}
