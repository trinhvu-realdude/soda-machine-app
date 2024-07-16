import { Product, ReleasedProduct } from "../interface";

const API_BASE_URL = "http://localhost:8080/api/v1";

export const getProducts = async () => {
    try {
        const data = await fetch(`${API_BASE_URL}/products`);
        const products = await data.json();
        return products;
    } catch (error) {
        console.log(error);
    }
};

export const createTransaction = async (
    selectedProduct: Product,
    username: string
) => {
    try {
        const data = await fetch(`${API_BASE_URL}/createTransaction`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                productId: selectedProduct.productId,
                price: selectedProduct.price,
                username: username,
            }),
        });

        const transaction = await data.json();
        return transaction.data;
    } catch (error) {
        console.log(error);
    }
};

export const cancelTransaction = async (
    releasedProduct: ReleasedProduct,
    username: string
) => {
    try {
        const data = await fetch(`${API_BASE_URL}/cancelTransaction`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                transactionId: releasedProduct.transactionId,
                username: username,
            }),
        });

        const transaction = await data.json();
        return transaction.data;
    } catch (error) {
        console.log(error);
    }
};
