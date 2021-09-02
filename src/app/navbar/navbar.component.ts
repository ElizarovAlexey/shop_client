import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../services/internationality/language.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

    constructor(public langS: LanguageService) { }

    ngOnInit(): void {
    }

    changeLanguage(event: any) {
        this.langS.activeLang = event.value;
    }

}
