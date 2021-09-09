import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../services/internationality/language.service';
import { UserService } from '../services/user.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

    constructor(public langS: LanguageService, public userS: UserService) { }

    selectedLang: string = this.langS.activeLang;

    ngOnInit(): void {
    }

    changeLanguage(event: { 'originalEvent': PointerEvent, 'value': string }) {
        this.langS.selectLang(event.value);
        this.selectedLang = event.value;
    }

}
