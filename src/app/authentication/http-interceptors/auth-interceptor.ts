import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private auth: AuthService, private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const authToken = this.auth.getToken();
        if (authToken != null) {
            if (this.auth.tokenHasExpired()) {
                this.auth.logout();

                return next.handle(req);
            }

            const authReq = req.clone({ setHeaders: { Authorization: `bearer ${authToken}` } });

            return next.handle(authReq);
        } else {
            return next.handle(req);
        }
    }
}