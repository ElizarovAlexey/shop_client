import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LanguageService } from 'src/app/services/internationality/language.service';

interface Category {
    id: number,
    name: string
}

@Component({
    selector: 'app-categories',
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

    @Output() onChangeCategory: EventEmitter<any> = new EventEmitter<any>();

    constructor(public langS: LanguageService, private http: HttpClient) { }

    categories: Category[];
    categorySelected: string = this.langS.translate("allSneakers");

    selectCategory(category: { 'id': number, 'name': string }) {
        this.categorySelected = category.name;
        this.onChangeCategory.emit(category);
    }

    selectAll() {
        this.onChangeCategory.emit(0);
        this.categorySelected = this.langS.translate("allSneakers");
    }

    ngOnInit(): void {
        if (this.categories == null) {
            this.http.get('/categories').subscribe((data: Array<{ 'id': number, 'name': string }>) => {
                this.categories = data;
            })
        }
    }

}
