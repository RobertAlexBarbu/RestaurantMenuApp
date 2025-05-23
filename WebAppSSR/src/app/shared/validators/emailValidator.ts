import { ValidationErrors, ValidatorFn } from '@angular/forms'

export const emailValidator: ValidatorFn = (control) => {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    if (emailRegex.test(control.value)) {
        return null
    } else {
        return {
            email: 'Invalid email',
        } as ValidationErrors
    }
}
