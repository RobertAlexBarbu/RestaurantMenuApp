import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export function hexColorValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        // Regular expression for hex color validation
        const hexColorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

        if (!control.value) {
            // if control is empty, return no error
            return null;
        }

        const isValid = hexColorRegex.test(control.value);

        // return null if valid, or validation error if invalid
        console.log(isValid);
        return isValid ? null : { invalidHexColor: { value: control.value } };
    };
}