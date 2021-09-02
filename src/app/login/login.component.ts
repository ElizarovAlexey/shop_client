import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LanguageService } from '../services/internationality/language.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    loginForm = new FormGroup({
        login: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required])
    });

    constructor(public langS: LanguageService) { }

    ngOnInit(): void {
    }

    loginAccount() {

    }

}
