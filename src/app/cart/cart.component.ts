import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Product } from '../product/product.component';
import { LanguageService } from '../services/internationality/language.service';
import { UserService } from '../services/user.service';
import { phoneValidator } from '../utils/formValidationUtils';

export class Cart {
    id: number;
    product_count: number;
    product_id: number;
    product_size: number;
    user_id: number;
}

class Order {
    id: number;
    name: string;
    city: string;
    date: Date;
    email: string;
    items: Array<Cart>;
    phone: string;
    state: string;
    total_price: number;
    commentary: string;
}

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

    constructor(
        public langS: LanguageService,
        private router: Router,
        private http: HttpClient,
        private userS: UserService
    ) { }

    products: Product[] = [];
    cartItems = [];
    totalPrice: number = 0;
    domain: string = environment.backendAddress;

    orderForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        name: new FormControl('', [Validators.required]),
        phone: new FormControl('', [Validators.required, phoneValidator]),
        city: new FormControl('', [Validators.required]),
        commentary: new FormControl('', [])
    });

    getCartItems() {
        let user = this.userS.user;
        this.products = this.products;
        let localStorageProducts = JSON.parse(localStorage.getItem('products'));


        this.http.get('/products').subscribe((data: { 'products': Array<Product>, 'total_price': number }) => {
            this.products = data.products;
            this.cartItems = [];

            if (user !== null) {
                this.http.get(`/cart?user_id=${user.id}`).subscribe((data: { 'items': Array<Cart>, 'total_price': number }) => {
                    if (data.items !== []) {
                        this.products.forEach((product: Product) => {
                            data.items.forEach((cart_item: Cart) => {
                                if (product.id == cart_item.product_id) {
                                    let item = {
                                        'id': cart_item.id,
                                        'title': product.title,
                                        'price': product.price,
                                        'size': cart_item.product_size,
                                        'count': cart_item.product_count,
                                        'image': product.image,
                                    }
                                    this.cartItems.push(item);
                                }
                            });
                        });

                        this.totalPrice = data.total_price;
                    }
                });
            } else if (localStorageProducts !== null) {
                let localTotalPrice = 0;
                this.products.forEach((product: Product) => {
                    localStorageProducts.forEach((cart_item: Cart) => {

                        if (product.id == cart_item.product_id) {
                            let item = {
                                'product_id': cart_item.product_id,
                                'title': product.title,
                                'price': product.price,
                                'size': cart_item.product_size,
                                'count': cart_item.product_count,
                                'image': product.image,
                            }
                            this.cartItems.push(item);
                            localTotalPrice += cart_item.product_count * product.price;
                        }
                    })
                });
                this.totalPrice = localTotalPrice;
            }
        });
    }

    changeCartItem(body: any) {
        this.http.put('/cart/', body).subscribe((data: Cart) => {
            this.getCartItems();
        })
    }

    deleteCartItem(item: any) {
        if (this.userS.user !== null) {
            this.http.delete(`/cart/${item.id}`).subscribe(data => {
                this.getCartItems();
            });
        } else if (localStorage.getItem('products') !== null) {
            let storage = JSON.parse(localStorage.getItem('products'));

            let indexForDeleting = storage.findIndex((element: Cart) => {
                return element.product_id = item.product_id;
            });

            storage.splice(indexForDeleting, 1);

            localStorage.removeItem('products');
            localStorage.setItem('products', JSON.stringify(storage));
            this.getCartItems();
        }

    }

    submitOrder() {
        this.orderForm.markAllAsTouched();
        this.orderForm.updateValueAndValidity();

        if (!this.orderForm.valid || this.cartItems.length == 0) {
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

        this.http.post(`/orders`, body).subscribe((data: Order) => {
            this.router.navigate(['/products']);
            this.orderForm.reset();
            localStorage.removeItem('products');
        });
    }

    handleProductsCount(item: {
        'id': number,
        'product_id': number,
        'title': string,
        'price': string,
        'size': number,
        'count': number,
        'image': string
    }, operation: string) {
        if (this.userS.user !== null) {
            let body = {
                'id': item.id,
                'product_count': item.count
            }

            switch (operation) {
                case 'plus':
                    body.product_count = item.count + 1;
                    break;
                case 'minus':
                    if (body.product_count <= 1) {
                        return
                    }
                    body.product_count = item.count - 1
                    break;
            }

            this.changeCartItem(body);
        } else if (localStorage.getItem('products') !== null) {
            let storage = JSON.parse(localStorage.getItem('products'));

            storage.forEach((element: any) => {
                if (element.product_id === item.product_id) {
                    if (operation == 'plus') {
                        element.product_count += 1;
                    } else if (operation == 'minus' && element.product_count > 1) {
                        element.product_count -= 1;
                    }
                }
            });

            localStorage.removeItem('products');
            localStorage.setItem('products', JSON.stringify(storage));
            this.getCartItems();
        }
    }

    ngOnInit(): void {
        this.getCartItems();
    }
}
