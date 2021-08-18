import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DataCategoriesService } from './data-categories.service';

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

    constructor(private categoriesServise: DataCategoriesService) { }

    categories: Category | any = null
    categorySelected: string | any = 'Все кроссовки'

    selectCategory(category: any) {
        this.categorySelected = category.name
        this.onChangeCategory.emit(category)
    }

    selectAll() {
        this.onChangeCategory.emit('all')
        this.categorySelected = 'Все кроссовки'
    }

    ngOnInit(): void {
        if (this.categories === null) {
            this.categoriesServise.getCategories().subscribe(data => {
                this.categories = data
            })
        }
    }

}
