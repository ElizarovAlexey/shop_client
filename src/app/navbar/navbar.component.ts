import { Component, OnInit, ViewChild } from '@angular/core';
import { LanguageService } from '../services/internationality/language.service';
import { UserService } from '../services/user.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

    constructor(public langS: LanguageService, public userS: UserService) { }
    @ViewChild('NavLeftMenu', { static: true }) navLeftMenu;

    selectedLang: string = this.langS.activeLang;
    isOpenMenu: boolean = false;

    ngOnInit(): void {
    }

    changeLanguage(event: { 'originalEvent': PointerEvent, 'value': string }) {
        this.langS.selectLang(event.value);
        this.selectedLang = event.value;
    }

    handleMenu() {
        this.isOpenMenu = !this.isOpenMenu;

        let navLeftMenuStyles = this.navLeftMenu.nativeElement.style;

        if (!this.isOpenMenu) {
            navLeftMenuStyles.display = 'block';
        } else {
            navLeftMenuStyles.display = 'none';
        }
    }

}
