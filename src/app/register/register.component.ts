import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LanguageService } from '../services/internationality/language.service';
import { RegisterService } from './register.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

    registerForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        login: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(255)]),
        confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(255)]),
    });

    constructor(public langS: LanguageService, private registerS: RegisterService, private router: Router) { }

    ngOnInit(): void { }

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

        this.registerS.postRegister(body).subscribe((data: any) => {
            if (data.status_code == 201) {
                this.router.navigate([`/${this.langS.activeLang}`]);
            }
        });
    }
}