import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class RegisterService {

    constructor(private http: HttpClient) { }

    postRegister(body: any) {
        return this.http.post('http://127.0.0.1:5000/register', body);
    }
}
