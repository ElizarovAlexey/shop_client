import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LanguageService } from '../services/internationality/language.service';
import { Cart, DataCartService } from './data-cart.service';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

    constructor(public langS: LanguageService, private cartService: DataCartService, private router: Router) { }

    cartItems: Cart[] = [];
    totalPrice: number = 0;
    domain: string = 'http://127.0.0.1:5000/';

    orderForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]),
        name: new FormControl('', [Validators.required, Validators.pattern(/[А-Яа-я]*?\s[А-Яа-я]*?\s[А-Яа-я]*/)]),
        phone: new FormControl('', [Validators.required]),
        city: new FormControl('', [Validators.required]),
        commentary: new FormControl('', [])
    });

    getCartItems() {
        this.cartService.getCartItems().subscribe((data: any) => {
            if (data.items !== []) {
                this.cartItems = data.items;
                this.totalPrice = data.total_price;
            }
        });
    }

    changeCartItem(uuid: string, body: any) {
        this.cartService.changeCartItem(uuid, body).subscribe(data => {
            this.getCartItems();
        })
    }

    deleteCartItem(id: number) {
        this.cartService.deleteCartItem(id).subscribe(data => {
            this.getCartItems();
        })
    }

    submitOrder() {
        this.orderForm.markAllAsTouched();
        this.orderForm.updateValueAndValidity();

        if (!this.orderForm.valid) {
            return;
        }

        let body = {
            'email': this.orderForm.controls.email.value,
            'name': this.orderForm.controls.name.value,
            'phone': this.orderForm.controls.phone.value,
            'city': this.orderForm.controls.city.value,
            'commentary': this.orderForm.controls.commentary.value,
            'total_price': this.totalPrice,
            'items': this.cartItems,
            'date': new Date()
        };

        this.cartService.sendOrder(body).subscribe(data => {
            this.router.navigate(['/products']);
            this.orderForm.reset();
        });
    }

    handleProductsCount(item: any, operation: string) {
        let body = {
            'product_title': item.product_title,
            'product_image': item.product_image,
            'product_price': item.product_price,
            'product_size': item.product_size,
            'product_count': item.product_count,
            'id': item.id,
        }

        switch (operation) {
            case 'plus':
                body.product_count = item.product_count + 1;
                break;
            case 'minus':
                if (body.product_count <= 1) {
                    return
                }
                body.product_count = item.product_count - 1
                break;
        }

        this.changeCartItem(item.uuid, body);
    }

    ngOnInit(): void {
        this.getCartItems();
    }
}
