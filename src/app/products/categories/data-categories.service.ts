import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class DataCategoriesService {

    constructor(private http: HttpClient) { }

    getCategories() {
        return this.http.get('http://127.0.0.1:5000/categories')
    }
}
