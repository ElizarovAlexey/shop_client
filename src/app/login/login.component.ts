import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { LanguageService } from '../services/internationality/language.service';
import { UserService } from '../services/user.service';
import { setServerValidationError } from '../utils/formValidationUtils';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    loginForm = new FormGroup({
        username: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required])
    });

    constructor(
        public langS: LanguageService,
        private http: HttpClient,
        private router: Router,
        private userS: UserService
    ) { }

    ngOnInit(): void {
    }

    loginAccount() {
        this.loginForm.markAllAsTouched();
        this.loginForm.updateValueAndValidity();

        if (!this.loginForm.valid) {
            return;
        }

        let body = {
            'username': this.loginForm.controls.username.value,
            'password': this.loginForm.controls.password.value
        }

        this.http.post('/login', body).subscribe((data: { 'token': string }) => {
            localStorage.setItem('token', data.token);
            this.userS.checkUser();

            this.router.navigate([`/${this.langS.activeLang}/`]);
            localStorage.removeItem('products');
        }, (error: HttpErrorResponse) => {
            if (error.status === 401) {
                setServerValidationError(this.loginForm, { 'type': 'invalidEmailOrPassword' });
            }

        });
    }

}
