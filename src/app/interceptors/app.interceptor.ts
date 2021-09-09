import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators'
import { Injectable } from '@angular/core';
import { environment } from "src/environments/environment"
import { MessageService } from 'primeng/api';
import { LanguageService } from '../services/internationality/language.service';

@Injectable()
export class AppInterceptor implements HttpInterceptor {

    private requestsCounter = 0;

    constructor(
        private httpClient: HttpClient,
        private messageS: MessageService,
        private langS: LanguageService
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.requestsCounter++;
        this.checkRequestsCount();
        let headers = {}
        let url = req.url;

        if (req.url.startsWith("/")) {
            if (!req.headers.get("Content-Type") && !(req.body instanceof FormData)) headers["Content-Type"] = "application/json";
            headers["Authorization"] = localStorage.getItem("token") || "";

            url = environment.backendAddress + req.url;
        }

        // if (localStorage.getItem("token") && !this.tokenUpdate) {  // обновление токена
        //     let dateEnd = new Date(+JSON.parse(atob(localStorage.getItem("token").split(".")[1])).exp * 1000);
        //     let dateUpdate = new Date(
        //         dateEnd.getFullYear(), dateEnd.getMonth(), dateEnd.getDate() - 7 + 1,
        //         dateEnd.getHours(), dateEnd.getMinutes(), dateEnd.getSeconds()
        //     ) // токен валиден 7 дней, а обновляется через 1 день
        //     if (dateUpdate < new Date) {
        //         this.tokenUpdate = true;
        //         this.httpClient.get("/update_token").subscribe(
        //             (value: any /* :{ token: string } */) => {
        //                 localStorage.setItem("token", value.token);
        //                 this.tokenUpdate = false;
        //             },
        //             error => {
        //                 this.tokenUpdate = false;
        //             }
        //         );
        //     }
        // }

        return next.handle(req.clone({ setHeaders: headers, url })).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    this.requestsCounter--;
                    this.checkRequestsCount();
                    if (req.method !== 'GET') {
                        this.messageS.add({
                            severity: 'success',
                            summary: this.langS.translate("success"),
                            detail: this.langS.translate("success")
                        });
                    }
                }
                return event;
            }),
            catchError((error: HttpErrorResponse) => {

                if (localStorage.getItem("token")) {
                    this.messageS.add({
                        severity: 'error',
                        summary: this.langS.translate("error"),
                        detail: this.langS.translate("error")
                    });
                }
                this.requestsCounter--;
                this.checkRequestsCount();
                return throwError(error);
            })
        );
    }

    checkRequestsCount() {
        let elem = document.getElementsByClassName("main-progress-bar")[0] as HTMLElement;
        if (elem) {
            if (this.requestsCounter > 0) elem.style.visibility = "visible";
            else elem.style.visibility = "hidden";
        }
    }
}
