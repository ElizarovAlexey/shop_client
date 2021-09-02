import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/services/internationality/language.service';

@Component({
    selector: 'app-intro',
    templateUrl: './intro.component.html',
    styleUrls: ['./intro.component.scss']
})
export class IntroComponent implements OnInit {

    constructor(public langS: LanguageService) { }

    ngOnInit(): void {
    }

}
