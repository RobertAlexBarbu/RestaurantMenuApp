import { Injectable } from '@angular/core'

@Injectable({
    providedIn: 'root',
})
export class UtilityService {
    generateRandomString(length: number): string {
        const characters =
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        let result = ''
        for (let i = 0; i < length; i++) {
            result += characters.charAt(
                Math.floor(Math.random() * characters.length),
            )
        }
        return result
    }

    downloadFile(fileUrl: string, fileName: string): void {
        const a = document.createElement('a')
        a.href = fileUrl || ''
        a.download = fileName
        a.click()

    }

    isMobile(): boolean {
        return /Mobi|Android|iPhone|iPad|iPod/.test(navigator.userAgent)
    }

    detectForcedDarkMode() {
        if (
            !navigator.userAgent.match(/Samsung/i) ||
            !window.matchMedia ||
            window.matchMedia('(prefers-color-scheme:dark)').matches
        )
            return false
        const ctx = document.createElement('canvas').getContext('2d'),
            img = new Image()
        img.src =
            'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IndoaXRlIi8+PC9zdmc+'
        if (!img.complete) img.dispatchEvent(new Event('load'))
        ctx!.drawImage(img, 0, 0)
        const [r, g, b] = ctx!.getImageData(0, 0, 1, 1).data
        return (r & b & g) < 255
    }
}
