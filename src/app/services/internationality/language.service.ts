import { Injectable } from '@angular/core';
import dictionary from './dictionary.json';
import { BehaviorSubject } from 'rxjs';
import { Location } from '@angular/common';
import { parseUrl } from '../../utils/urlParser';
import { Router } from '@angular/router';

// tsconfig.json / compilerOptions

// "resolveJsonModule": true,
// "esModuleInterop": true,
// "allowSyntheticDefaultImports": true

// после перезапустить vscode

export type dictionaryKey = keyof typeof dictionary;
export type translateArgs = { key: dictionaryKey, replaceValues?: Array<string | number> };

@Injectable({
    providedIn: 'root',
})
export class LanguageService {

    readonly dictionary = dictionary;
    readonly languages = ['ru', 'ro', 'en'];  // меняя [0], поменять и в app-routing.module

    activeLang: string;

    onChangeLang: BehaviorSubject<string>;

    constructor(
        private location: Location,
        private router: Router
    ) {
        const urlData = parseUrl(this.location.path());
        this.selectLang(urlData.pathValues[0]);

        this.onChangeLang.subscribe(() => {
            let oldUrl = this.location.path();

            if (!oldUrl || oldUrl === '/' || oldUrl.lastIndexOf("/") === 0) {
                const urlData = parseUrl(oldUrl);
                var newUrl = '/' + this.activeLang;
                if (urlData.queryParams) newUrl += "?" + urlData.queryParams;
                if (urlData.hash) newUrl += "#" + urlData.hash;
            } else {
                newUrl = oldUrl.replace(/^\/.+?\//, `/${this.activeLang}/`);
            }
            if (oldUrl !== newUrl) setTimeout(() => this.router.navigateByUrl(newUrl));
        });
    }

    selectLang(lang: string) {
        if (this.languages.indexOf(lang) === -1) {
            console.warn(`language "${lang}" not in languages`);
            if (this.languages.indexOf(lang) === -1) {
                lang = this.languages[0];
            }
        }
        if (this.activeLang === lang) return;
        this.activeLang = lang;
        if (this.onChangeLang) this.onChangeLang.next(lang);
        else this.onChangeLang = new BehaviorSubject(lang);
    }

    translate(key: dictionaryKey): string;
    translate(key: dictionaryKey, replaceValues: Array<string | number>): string;
    translate(key: translateArgs): string;
    translate(key: dictionaryKey | translateArgs, replaceValues: Array<string | number> = []) {
        if (!key) return "TRANSLATE_KEY_ERR";
        if (typeof key === "object") {
            replaceValues = key.replaceValues || [];
            key = key.key;
        }
        else if (!this.dictionary[key]) {
            console.warn(`key "${key}" not in dictionary`)
            return "TRANSLATE_KEY_ERR";
        };
        if (!this.dictionary[key][this.activeLang]) {
            console.warn(`value by key "${key}" and lang "${this.activeLang}" not in dictionary`)
            return "TRANSLATE_VALUE_ERR";
        };
        return this.stringFormat(this.dictionary[key][this.activeLang], replaceValues);
    }

    private stringFormat(str: string, values: any[]) {
        values.forEach((value, idx) => {
            str = str.replace(RegExp(`%${idx}`, "g"), value);
        });
        return str;
    }
}
