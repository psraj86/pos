import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { DataView } from 'primeng/dataview';
import { Product } from 'src/app/demo/api/product';
import { ProductService } from 'src/app/demo/service/product.service';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrl: './product.component.scss',
})
export class ProductComponent {
    products: Product[] = [
        {
        "id": "6567548230eb60049a0bac49",
        "name": "Jackey underwear - Soft Updated",
        "description": "Very comfortable product updated",
        "price": 199.0,
        "currency": "USD",
        "variants":[
        {
        "size": "Large","color": "Blue"
        },
        {
        "size": "Small","color": "Red"
        },
        {
        "size": "Medium","color": "Green"
        }],
        "category":{
        "id": "6567545d30eb60049a0bac48","name": "Clothing7"
        },
        "gender":{
        "genderType": "MALE"
        },
        "ageGroup":{
        "ageGroupType": "ADULTS"
        }}]
        ;

    sortOptions: SelectItem[] = [];

    sortOrder: number = 0;

    sortField: string = '';

    sourceCities: any[] = [];

    targetCities: any[] = [];

    orderCities: any[] = [];

    constructor(private productService: ProductService) {}

    ngOnInit() {
        this.productService
            .getProducts()
            .then((data) => (this.products = data));

        this.sourceCities = [
            { name: 'San Francisco', code: 'SF' },
            { name: 'London', code: 'LDN' },
            { name: 'Paris', code: 'PRS' },
            { name: 'Istanbul', code: 'IST' },
            { name: 'Berlin', code: 'BRL' },
            { name: 'Barcelona', code: 'BRC' },
            { name: 'Rome', code: 'RM' },
        ];

        this.targetCities = [];

        this.orderCities = [
            { name: 'San Francisco', code: 'SF' },
            { name: 'London', code: 'LDN' },
            { name: 'Paris', code: 'PRS' },
            { name: 'Istanbul', code: 'IST' },
            { name: 'Berlin', code: 'BRL' },
            { name: 'Barcelona', code: 'BRC' },
            { name: 'Rome', code: 'RM' },
        ];

        this.sortOptions = [
            { label: 'Price High to Low', value: '!price' },
            { label: 'Price Low to High', value: 'price' },
        ];
    }

    onSortChange(event: any) {
        const value = event.value;

        if (value.indexOf('!') === 0) {
            this.sortOrder = -1;
            this.sortField = value.substring(1, value.length);
        } else {
            this.sortOrder = 1;
            this.sortField = value;
        }
    }

    onFilter(dv: DataView, event: Event) {
        dv.filter((event.target as HTMLInputElement).value);
    }
}
