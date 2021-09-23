import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { LanguageService } from '../services/internationality/language.service';
import { User } from '../services/user.service';
import { passwordConfirmValidatorPartPassword, passwordConfirmValidatorPartPasswordConfirm, trimValidator } from '../utils/formValidationUtils';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

    registerForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        login: new FormControl('', [Validators.required]),
        password: new FormControl('', [])
    });

    constructor(
        public langS: LanguageService,
        private http: HttpClient,
        private router: Router,
        private messageService: MessageService
    ) { }

    ngOnInit(): void {
        this.registerForm.addControl("passwordConfirm", new FormControl('', [
            passwordConfirmValidatorPartPasswordConfirm.bind(this, this.registerForm.controls.password)
        ]));
        this.registerForm.controls.password.setValidators([
            Validators.required, Validators.maxLength(128), Validators.minLength(8), trimValidator,
            passwordConfirmValidatorPartPassword.bind(this, this.registerForm.controls.passwordConfirm)
        ]);
    }

    registerAccount() {
        this.registerForm.markAllAsTouched();
        this.registerForm.updateValueAndValidity();

        if (!this.registerForm.valid) {
            return;
        }

        let body = {
            'username': this.registerForm.controls.login.value,
            'email': this.registerForm.controls.email.value,
            'password': this.registerForm.controls.password.value
        }

        this.http.post('/register', body).subscribe((data: { 'error'?: string, 'user'?: User, 'status_code': number }) => {
            if (data.status_code == 201) {
                this.messageService.add({ severity: 'success', summary: this.langS.translate('successRegistration') });
                setTimeout(() => {
                    this.router.navigate([`/${this.langS.activeLang}`]);
                }, 2000);
            }
        });
    }
}