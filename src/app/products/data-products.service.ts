import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class GetProductsService {

    constructor(private http: HttpClient) { }

    totalProducts: number = 0;

    getProducts(category: number = 0, page: number = 1) {
        return this.http.get(`http://127.0.0.1:5000/products?category=${category}&page=${page}`);
    }

    getSizes() {
        return this.http.get('http://127.0.0.1:5000/sizes/');
    }
}

