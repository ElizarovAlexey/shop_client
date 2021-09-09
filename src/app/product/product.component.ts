import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Cart } from '../cart/cart.component';
import { LanguageService } from '../services/internationality/language.service';
import { UserService } from '../services/user.service';

interface Size {
    id: number,
    value: number
}

export interface Product {
    id: number,
    uuid: string,
    title: string,
    price: number,
    image: string,
    in_stock: boolean,
    sizes: Size[]
}

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

    constructor(private activatedRoute: ActivatedRoute,
        private router: Router,
        private http: HttpClient,
        public langS: LanguageService,
        private userS: UserService) { }

    uuid: string = '';
    product: Product;

    productCount: number = 1;
    selectedSize: number;
    domain: string = environment.backendAddress;

    getProduct(uuid: string) {
        this.http.get(`/products/${uuid}`).subscribe((data: { 'product': Product, 'sizes': Array<Size> }) => {
            this.product = data.product;

            this.product.sizes = data.sizes.slice(0);
            this.product.sizes.sort((firstSize: Size, secondSize: Size) => {
                let x = firstSize.value;
                let y = secondSize.value;
                return x < y ? -1 : x > y ? 1 : 0;
            });
        });
    }

    handleProductsCount(operation: string) {
        switch (operation) {
            case 'plus':
                this.productCount++;
                break;
            case 'minus':
                if (this.productCount <= 1) {
                    break;
                }
                this.productCount--
                break;
        }
    }

    sendToCart() {
        if (this.userS.user !== null) {
            let body = {
                product_id: this.product.id,
                product_size: this.selectedSize,
                product_count: this.productCount,
                user_id: this.userS.user.id
            };

            this.http.post('/cart', body).subscribe((data: Cart) => {
                this.router.navigate(['/products']);
            });
        } else {
            let storage = JSON.parse(localStorage.getItem('products')) || [];
            let body = {
                product_id: this.product.id,
                product_size: this.selectedSize,
                product_count: this.productCount,
            };
            storage.push(body);

            localStorage.setItem('products', JSON.stringify(storage));
            this.router.navigate(['/products']);
        }
    }

    ngOnInit(): void {
        this.activatedRoute.params.forEach(param => {
            this.uuid = param['uuid'];
        });

        this.getProduct(this.uuid);
    }

}
