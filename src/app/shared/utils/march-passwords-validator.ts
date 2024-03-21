import { ValidatorFn } from "@angular/forms";

export function matchPasswordsValidator(
    passwordControlName: string, 
    rePasswordControlName: string
    ): ValidatorFn {
    return (control) => {
        const passwordFormControl = control.get(passwordControlName),
              rePasswordFormControl = control.get(rePasswordControlName),
              areMatching = passwordFormControl?.value == rePasswordFormControl?.value;    
                
        return areMatching ? null : {matchPasswordsValidator: true}
    };
}