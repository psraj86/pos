import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from './../../../environments/environment';
@Injectable({
    providedIn: 'root',
})
export class AddressService {
    http = inject(HttpClient);
    BASE_URL = environment.url;
    updateAddressById(id: string, address: any) {
        const url = `${this.BASE_URL}/addresses/${id}`;
        const access_token = localStorage.getItem('access_token');
        const headers = new HttpHeaders({
            Authorization: `${access_token}`,
            'Content-Type': 'application/json',
        });
        return this.http.put(url, JSON.stringify(address), { headers });
    }

    addAddress(address: any) {
        const url = `${this.BASE_URL}/addresses`;
        const access_token = localStorage.getItem('access_token');
        const headers = new HttpHeaders({
            Authorization: `${access_token}`,
            'Content-Type': 'application/json',
        });
        return this.http.post(url, JSON.stringify(address), {
            headers,
        });
    }
    deleteAddress(id: string) {
        const url = `${this.BASE_URL}/addresses/${id}`;
        const access_token = localStorage.getItem('access_token');
        const headers = new HttpHeaders({
            Authorization: `${access_token}`,
            'Content-Type': 'application/json',
        });
        return this.http.delete(url, {
            headers,
        });
    }
}
