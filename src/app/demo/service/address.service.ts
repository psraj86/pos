import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from './../../../environments/environment';
@Injectable({
    providedIn: 'root',
})
export class AddressService {
    http = inject(HttpClient);
    BASE_URL = environment.url;
    updateAddressById(username: string, addressId: number) {
        const url = `${this.BASE_URL}/profile/${username}/${addressId}`;
    }

    addAddress(username: string) {
        const url = `${this.BASE_URL}/profile/${username}`;
        const access_token = localStorage.getItem('access_token');
        const headers = new HttpHeaders({
            Authorization: `${access_token}`,
            'Content-Type': 'application/json',
        });
        return this.http.put(
            url,
            JSON.stringify({
                addresses: [
                    {
                        city: 'Onew Address Peter',
                        state: 'One Addrese 2 SIngh',
                        street: 'L1 343',
                        country: 'India',
                        zipcode: 123123,
                    },
                ],
            }),
            {
                headers,
            }
        );
    }
}
