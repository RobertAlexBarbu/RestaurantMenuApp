import { inject, Pipe, PipeTransform } from '@angular/core'
import { DomSanitizer } from '@angular/platform-browser'

@Pipe({
    name: 'safeResource',
    standalone: true,
})
export class SafeResourcePipe implements PipeTransform {
    private readonly sanitizer = inject(DomSanitizer)

    transform(url: string) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(url)
    }

}
