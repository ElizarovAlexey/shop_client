import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LanguageService } from '../services/internationality/language.service';

interface Product {
    title: string,
    price: number,
    uuid: string,
    image: string
}

@Component({
    selector: 'app-product',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

    constructor(public langS: LanguageService, private http: HttpClient) { }

    products: Product[];
    totalRecords: number;
    selectedCategory: number;
    domain: string = environment.backendAddress;

    getProducts(category: number, page: number) {
        this.http.get(`/products?category=${category}&page=${page}`).subscribe((data: any) => {
            let productsInStock = [];
            data.products.forEach((product: any) => {
                if (product.in_stock == true) {
                    productsInStock.push(product);
                }
            });

            this.totalRecords = data.total_records;
            this.products = productsInStock;

        })
    }

    changeCategory(category: { 'id': number, 'name': string }) {
        this.getProducts(category.id, 1);

        this.selectedCategory = category.id;
    }

    changePage(selectedCategory: number, event: {
        first: number,
        page: number,
        pageCount: number,
        rows: number
    }) {
        console.log(event);

        this.getProducts(selectedCategory, event.page + 1);
    }

    ngOnInit(): void {
        this.getProducts(0, 1);
    }
}
