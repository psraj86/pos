import { Component, inject } from '@angular/core';
import { AddressService } from '../../service/address.service';
import { JsonWebTokenService } from '../../service/json-web-token.service';
import { UserService } from '../../service/user.service';
import { FormBuilder, FormGroup } from '@angular/forms';

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
    fb = inject(FormBuilder);
    addressForm!: FormGroup;
    user: any;
    firstName: string = '';
    lastName: string = '';

    ngOnInit(): void {
        this.getUserProfile();
    }
    getUserProfile() {
        const token = this.jwtService.getToken();
        const { username } = this.jwtService.decode(token);

        this.userService.getUserProfile(username).subscribe((res) => {
            this.user = res;
            this.firstName = this.user.firstName;
            this.lastName = this.user.lastName;
        });
    }
    updateUserData(updatedUser: any) {
        this.userService
            .updateUser(updatedUser, this.user.username)
            .subscribe((res) => {
                this.visible = false;
                this.getUserProfile();
            });
    }

    createAddressForm() {
        this.addressForm = this.fb.group({
            street: [''],
            city: [''],
            state: [''],
            country: [''],
            zipcode: [''],
        });
    }
    saveAddress() {
        const address = { ...this.addressForm.value, userId: this.user['_id'] };
        if (this.selectedAddress?._id) {
            this.updateAddress(this.selectedAddress._id, address);
        } else {
            this.addAddress(address);
        }
    }
    resetForm() {
        this.addressForm.reset();
    }

    openUserModifyDialog() {
        this.visible = true;
    }

    updateUser() {
        this.visible = false;
    }

    addAddress(address) {
        this.addressService.addAddress(address).subscribe((res) => {
            this.visibleAddressDialog = false;
            this.getUserProfile();
        });
    }

    updateAddress(id: string, address: any) {
        this.addressService.updateAddressById(id, address).subscribe((res) => {
            this.visibleAddressDialog = false;
            this.selectedAddress = null;
            this.getUserProfile();
        });
    }

    openAddressDialog(type?: string) {
        this.createAddressForm();
        setTimeout(() => {
            if (type === 'edit') {
                this.addressForm.patchValue({ ...this.selectedAddress });
            }
        });
        this.visibleAddressDialog = true;
    }

    deleteAddress(id: string) {
        this.addressService.deleteAddress(id).subscribe((res) => {
            this.getUserProfile();
        });
    }
}
