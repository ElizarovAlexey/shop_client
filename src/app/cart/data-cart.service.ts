import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface Cart {
    'id': number,
    'title': string,
    'image': string,
    'price': number,
    'size': number,
    'count': number,
    'uuid': string,
}

@Injectable({
    providedIn: 'root'
})
export class DataCartService {

    constructor(private http: HttpClient) { }

    domain = 'http://127.0.0.1:5000';

    getCartItems() {
        return this.http.get(`${this.domain}/cart`);
    }

    changeCartItem(uuid: string, body: any) {
        return this.http.put(`${this.domain}/cart`, body);
    }

    deleteCartItem(id: number) {
        return this.http.delete(`${this.domain}/cart/${id}`);
    }

    sendOrder(body: any) {
        return this.http.post(`${this.domain}/order`, body);
    }
}
