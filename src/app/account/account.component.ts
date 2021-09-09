import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../services/internationality/language.service';
import { UserService } from '../services/user.service';

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

    constructor(
        public userS: UserService,
        private langS: LanguageService
    ) { }

    ngOnInit(): void {
    }

}
