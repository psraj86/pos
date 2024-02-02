interface InventoryStatus {
    label: string;
    value: string;
}
export interface Product {
    id?: string;
    code?: string;
    name: string;
    description?: string;
    price?: number;
    quantity?: number;
    inventoryStatus?: InventoryStatus;
    category?: { name: string; id: string };
    currency?: string;
    variants?: {}[];
    gender: any;
    ageGroup: any;
    image?: string;
    rating?: number;
}
