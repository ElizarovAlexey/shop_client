import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { Observable, Observer } from 'rxjs';
import { LanguageService } from '../services/internationality/language.service';
import { UserService } from '../services/user.service';



@Injectable({
    providedIn: 'root'
})
export class MainGuard implements CanActivate {

    constructor(private router: Router, private http: HttpClient, private userS: UserService, private langS: LanguageService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if (!localStorage.getItem('token')) {
            return true;
        }
        return new Observable((observer: Observer<boolean>) =>
            this.http.get("/check_token").subscribe((data: any) => {
                this.userS.user = data;
                this.userS.isLogin = true;

                observer.next(true)
                observer.complete();
            }, error => {
                observer.next(false)
                observer.complete();

                this.router.navigate([`/${this.langS.activeLang}/login`]);
            }));
    }
}
