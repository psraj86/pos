import { Injectable, signal } from '@angular/core';
//import * as jwt from 'jsonwebtoken';
import * as jwt from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class JsonWebTokenService {
    user = new BehaviorSubject(null);
    
    decode(accessToken: string) {
        const user = jwt.jwtDecode(accessToken);
        return user;
    }

    getToken(){
        return localStorage.getItem("access_token");
    }
}
