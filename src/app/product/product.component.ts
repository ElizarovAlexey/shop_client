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
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

    constructor(private getProductsService: GetProductsService) { }

    products: Product[] | any = null
    sortedProducts: Product[] | any = []
    filteredProducts: Product[] | any = []

    domain: string = 'http://127.0.0.1:5000/'

    changeCategory(category: any) {
        this.sortedProducts = []

        if (category === 'all') {
            this.filteredProducts = this.products
            return
        }

        this.products.forEach((element: any) => {
            element.categories.forEach((cat: any) => {
                if (cat.id === category.id) {
                    this.sortedProducts.push(element)
                }
            });
        });
        this.filteredProducts = this.sortedProducts
    }

    ngOnChanges(): void {
        if (this.sortedProducts.length) {
            this.filteredProducts = this.sortedProducts
        }

        this.filteredProducts = this.products
    }

    ngOnInit(): void {
        if (this.products === null) {
            this.getProductsService.getProducts().subscribe(data => {
                this.products = data
                this.filteredProducts = data
            })
        }
    }
}
