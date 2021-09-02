import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LanguageService } from '../services/internationality/language.service';
import { DataProductService } from './data-product.service';
import { Product } from './data-product.service'

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

    constructor(private activatedRoute: ActivatedRoute,
        private router: Router,
        private productService: DataProductService,
        public langS: LanguageService) { }

    uuid: string = '';
    product: Product | any;
    domain: string = 'http://127.0.0.1:5000/';

    productCount: number = 1;
    selectedSize: any;

    getProduct(uuid: string) {
        this.productService.getProduct(uuid).subscribe((data: any) => {
            this.product = data.product;

            this.product.sizes = data.sizes.slice(0);
            this.product.sizes.sort((a: any, b: any) => {
                let x = a.value;
                let y = b.value;
                return x < y ? -1 : x > y ? 1 : 0;
            });
        });
    }

    postCart(body: Object) {
        this.productService.sendToCart(body).subscribe(data => {
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
        let body = {
            product_title: this.product.title,
            product_price: this.product.price,
            product_image: this.product.image,
            product_size: this.selectedSize,
            product_count: this.productCount,
            product_uuid: this.product.uuid,
        }

        this.postCart(body);
        this.router.navigate(['/products']);
    }

    ngOnInit(): void {
        this.activatedRoute.params.forEach(param => {
            this.uuid = param['uuid'];
        });

        this.getProduct(this.uuid);
    }

}
