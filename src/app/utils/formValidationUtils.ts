import { FormControl, FormGroup } from '@angular/forms';

// export function validateAllFormFields(formGroup: FormGroup) {
//     Object.keys(formGroup.controls).forEach(field => {
//         const control = formGroup.get(field);
//         if (control instanceof FormControl) {
//             control.markAsTouched({ onlySelf: true });
//         } else if (control instanceof FormGroup) {
//             this.validateAllFormFields(control);
//         }
//     });
// }

export type serverValidationError = {
    type: string;
    value?: any;
    field?: string;
}

export function setServerValidationError(form: FormGroup, error?: serverValidationError) {
    if (!error || !error.type) error = { type: "unknownError" };
    if (!error.field) form.setErrors({ ...form.errors, [error.type]: "value" in error ? error.value : true });
    else form.get(error.field).setErrors({ ...form.get(error.field).errors, [error.type]: "value" in error ? error.value : true });
}

export function passwordConfirmValidatorPartPassword(passwordConfirm: FormControl, password: FormControl) {
    passwordConfirm.updateValueAndValidity({ onlySelf: true });
    passwordConfirm.markAsTouched({ onlySelf: true });
    return null;
}

export function nameValidatorpasswordConfirmValidatorPartPasswordConfirm(password: FormControl, passwordConfirm: FormControl) {
    if (password.value !== passwordConfirm.value) return { 'passwordConfirmError': true };
    return null;
}

export function phoneValidator(control: FormControl) {
    if (testFull(control.value, /[\d- ]+/)) return null;
    return { 'phoneError': true };
}

export function nameValidator(control: FormControl) {
    if (testFull(control.value, /[А-Яа-я]*?\s[А-Яа-я]*?\s[А-Яа-я]*/)) return null;
    return { 'nameError': true };
}

export function trimValidator(control: FormControl) {
    if (control.value.match(/^\s|\s$/)) return { 'trimError': true };
    return null;
}

function testFull(str: string, regExp: RegExp) {
    const rez = str.match(regExp);
    return rez && rez[0].length === str.length;
}

export function fileSizeValidator(fileInput: HTMLInputElement, maxSizeByBites = 14000000) {
    return (control: FormControl) => {
        const file = fileInput.files[0];
        if (file && file.size > maxSizeByBites) return { "fileSizeError": { size: file.size, maxSize: maxSizeByBites } };
        return null;
    };
}