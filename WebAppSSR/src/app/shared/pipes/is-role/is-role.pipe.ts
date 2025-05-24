import { Pipe, PipeTransform } from '@angular/core'
import { Role } from '../../configs/Role'


@Pipe({
    name: 'isRole',
    standalone: true,
})
export class IsRolePipe implements PipeTransform {
    transform(value: {role: string}, role: Role): boolean {
        return value.role === role
    }
}
