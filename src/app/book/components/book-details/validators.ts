import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export const minLength2: ValidatorFn = (control: AbstractControl): ValidationErrors | null =>
  control.value && control.value.length < 2 ? {"minLength2": "The value is too short!"} : null;

export const minLength = (minLength: number): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    return control.value && control.value.length < minLength ? {"minLength": "The value is too short!"} : null;
  }
}

export const maxLengthFullName = (maxLength: number): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    const firstNameControl = control.get('firstName');
    const lastNameControl = control.get('lastName');
    return firstNameControl?.value && lastNameControl?.value && firstNameControl?.value.length + lastNameControl?.value.length > maxLength ? {"maxLengthFullName": "The name is too long!"} : null;
  }
}
