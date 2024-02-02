import {
    HttpEvent,
    HttpHandler,
    HttpHeaders,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

export class CustomInterceptor implements HttpInterceptor {
    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        const access_token = localStorage.getItem('access_token');
        const headers = req.headers || new HttpHeaders();
        headers.set('Content-Type', 'application/json');
        if (req.url.includes('sign-in') || req.url.includes('register')) {
            return next.handle(req);
        }

        const modifyReq = req.clone({
            setHeaders: {
                Authorization: `${access_token}`,
                'content-type': 'application/json',
            },
        });

        return next.handle(modifyReq);
    }
}
