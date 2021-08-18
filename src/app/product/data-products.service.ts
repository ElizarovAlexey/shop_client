import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class GetProductsService {

    constructor(private http: HttpClient) { }

    getProducts(page: any = 1) {
        return this.http.get(`http://127.0.0.1:5000/products/?page=${page}`)
    }
}

