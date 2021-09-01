import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface Size {
    id: number,
    value: number
}

export interface Product {
    title: string,
    price: number,
    image: string,
    in_stock: boolean,
    sizes: Size[]
}

@Injectable({
    providedIn: 'root'
})
export class DataProductService {

    constructor(private http: HttpClient) { }

    getProduct(uuid: string) {
        return this.http.get(`http://127.0.0.1:5000/products/${uuid}/`);
    }

    sendToCart(body: Object) {
        return this.http.post(`http://127.0.0.1:5000/cart/`, body);
    }
}
