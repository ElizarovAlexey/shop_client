import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LanguageService } from './internationality/language.service';

export class User {
    id: number;
    username: string;
    email: string;
    is_admin: boolean;
    uuid: string;
}

@Injectable({
    providedIn: 'root'
})
export class UserService {

    isLogin: boolean = false;
    token: string = '';
    user: User = null;

    constructor(
        private http: HttpClient,
        private router: Router,
        private langS: LanguageService) { }

    checkUser() {
        let token = localStorage.getItem('token');

        if (token) {
            this.http.get('/check_token').subscribe((data: User) => {
                this.user = data;
                this.isLogin = true;
            }), (error: HttpErrorResponse) => {
                console.log(error);

                localStorage.removeItem('token');
            };
        } else {
            this.isLogin = false;
            this.user = null;
        }
    }

    logOut() {
        localStorage.removeItem('token');
        this.checkUser();
        this.router.navigate([`/${this.langS.activeLang}/`]);
    }
}