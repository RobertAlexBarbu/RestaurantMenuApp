import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms'

export function minCheckboxesCheckedValidator(minChecked: number): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
        if (!(formGroup instanceof FormGroup)) {
            throw new Error('Validator can only be applied to FormGroup')
        }

        const checkedCount = Object.values(formGroup.controls).filter(
            (control) => control.value === true,
        ).length

        return checkedCount >= minChecked
            ? null
            : {
                minCheckboxesChecked: {
                    required: minChecked,
                    actual: checkedCount,
                },
            }
    }
}
