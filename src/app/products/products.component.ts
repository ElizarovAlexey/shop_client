import { Component, OnInit } from '@angular/core';
import { GetProductsService } from './data-products.service';

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

    constructor(private getProductsService: GetProductsService) { }

    products: Product[];

    totalRecords: number;
    selectedCategory: number;

    domain: string = 'http://127.0.0.1:5000/'

    getProducts(category: number, page: number) {
        this.getProductsService.getProducts(category, page).subscribe((data: any) => {
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

    changeCategory(category: any) {
        this.getProducts(category.id, 1);
        this.selectedCategory = category.id;
    }

    changePage(selectedCategory: number, event: any) {
        this.getProducts(selectedCategory, event.page + 1);
    }

    ngOnInit(): void {
        this.getProducts(0, 1);
    }
}
