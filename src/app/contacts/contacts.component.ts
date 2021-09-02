import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../services/internationality/language.service';

@Component({
    selector: 'app-contacts',
    templateUrl: './contacts.component.html',
    styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

    constructor(
        public langS: LanguageService
    ) { }

    ngOnInit(): void {
    }

}
