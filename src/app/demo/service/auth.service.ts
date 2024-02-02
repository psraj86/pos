import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
export interface Credential {
    username: string;
    password: string;
}

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(private http: HttpClient) {}
    BASE_URL = environment.url;
    signIn(credentials: Credential): Observable<any> {
        const url = `${this.BASE_URL}/customer/sign-in`;
        const headers = new HttpHeaders({ 'content-type': 'application/json' });
        return this.http.post<any>(url, JSON.stringify(credentials), {
            headers,
        });
    }

    register(user: any) {
        const url = `${this.BASE_URL}/register`;
        const headers = new HttpHeaders({ 'content-type': 'application/json' });
        return this.http.post(url, JSON.stringify(user), { headers });
    }
}
