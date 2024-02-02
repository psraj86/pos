import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { JsonWebTokenService } from './json-web-token.service';
import { environment } from 'src/environments/environment';
export interface Credential {
    username: string;
    password: string;
}

@Injectable({
    providedIn: 'root',
})
export class UserService {
    constructor(
        private http: HttpClient,
        private jwtService: JsonWebTokenService
    ) {}
    BASE_URL = environment.url;
    updateUserByAdmin() {}

    getUserProfile(username: string) {
        const url = `${this.BASE_URL}/profile/${username}`;
        const access_token = localStorage.getItem('access_token');
        const headers = new HttpHeaders({
            Authorization: `${access_token}`,
            'Content-Type': 'application/json',
        });
        return this.http.get(url, { headers });
    }
}
