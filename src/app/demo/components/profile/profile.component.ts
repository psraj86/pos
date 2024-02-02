import { Component, inject } from '@angular/core';
import { AddressService } from '../../service/address.service';
import { JsonWebTokenService } from '../../service/json-web-token.service';
import { UserService } from '../../service/user.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.scss',
})
export class ProfileComponent {
    selectedAddress!: any;
    visible = false;
    visibleAddressDialog = false;
    jwtService = inject(JsonWebTokenService);
    userService = inject(UserService);
    addressService = inject(AddressService);

    user: any;
    firstName: string = '';
    lastName: string = '';
    ngOnInit(): void {
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.
        const token = this.jwtService.getToken();
        const loggedInUser = this.jwtService.decode(token);
        const username = loggedInUser['user'].username;
        console.log(username);
        // this.addressService
        //     .addAddress(username)
        //     .subscribe((address) => console.log(address));
        this.userService
            .getUserProfile(username)
            .subscribe((res) => (this.user = res));
    }
    // user = {
    //     userName: 'one',
    //     firstName: 'one',
    //     lastName: 'second',
    //     address: [
    //         {
    //             addressId: 6,
    //             street: '283 P II floor',
    //             city: 'Gurgaon',
    //             state: 'Haryana',
    //             country: 'India',
    //             zipcode: 122002,
    //         },
    //         {
    //             addressId: 7,
    //             street: '283 P II floor',
    //             city: 'Gurgaon',
    //             state: 'Haryana',
    //             country: 'India',
    //             zipcode: 122002,
    //         },
    //         {
    //             addressId: 8,
    //             street: '283 P II floor',
    //             city: 'Gurgaon',
    //             state: 'Haryana',
    //             country: 'India',
    //             zipcode: 122002,
    //         },
    //         {
    //             addressId: 9,
    //             street: '283 P II floor',
    //             city: 'Gurgaon',
    //             state: 'Haryana',
    //             country: 'India',
    //             zipcode: 122002,
    //         },
    //         {
    //             addressId: 10,
    //             street: '283 P II floor',
    //             city: 'Gurgaon',
    //             state: 'Haryana',
    //             country: 'India',
    //             zipcode: 122002,
    //         },
    //     ],
    // };

    openUserModifyDialog() {
        this.visible = true;
    }

    updateUser() {
        this.visible = false;
    }

    updateAddress(username: string, addressId: number) {
        this.addressService.updateAddressById(username, addressId);
    }

    openAddressDialog() {
        this.visibleAddressDialog = true;
    }
}
