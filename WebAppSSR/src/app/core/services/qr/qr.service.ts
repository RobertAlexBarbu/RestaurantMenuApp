import { Injectable } from '@angular/core'
import * as QRCode from 'qrcode'
import { from, of, switchMap } from 'rxjs'

@Injectable({
    providedIn: 'root',
})
export class QrService {
    generateSvg(url: string) {
        return from(QRCode.toString(url, { type: 'svg' }))
            .pipe(
                switchMap((svgString) => {
                    if (!svgString) throw new Error('Failed to generate SVG')
                    const blob = new Blob([svgString], { type: 'image/svg+xml' })
                    return of(URL.createObjectURL(blob))
                }),
            )
    }

    generatePng(url: string) {
        return from(QRCode.toDataURL(url, {
            width: 512,
        }))
    }
}
