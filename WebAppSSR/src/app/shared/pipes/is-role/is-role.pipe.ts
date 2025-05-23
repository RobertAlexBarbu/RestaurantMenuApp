import { Pipe, PipeTransform } from '@angular/core'
import { Role } from '../../configs/Role'
import { UserDto } from '../../../core/http/dto/user/user.dto'

@Pipe({
    name: 'isRole',
    standalone: true,
})
export class IsRolePipe implements PipeTransform {
    transform(value: UserDto, role: Role): boolean {
        return value.role === role
    }
}
