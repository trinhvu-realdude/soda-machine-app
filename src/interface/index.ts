export interface Product {
    productId: number;
    name: string;
    price: number;
    imageUrl: string;
    quantity: number;
}

export interface ReleasedProduct {
    name: string;
    imageUrl: string;
    quantity: number;
    transactionId: number;
}
