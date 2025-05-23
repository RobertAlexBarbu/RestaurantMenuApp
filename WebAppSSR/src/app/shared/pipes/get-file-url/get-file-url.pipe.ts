import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
    name: 'getFileUrl',
    standalone: true,
})
export class GetFileUrlPipe implements PipeTransform {
    transform(value: File): string {
        return URL.createObjectURL(value)
    }
}
