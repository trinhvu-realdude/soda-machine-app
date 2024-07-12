import { useEffect, useState } from "react";
import "../styles/BodyMachine.css";
import { Product, ReleasedProduct } from "../interface";
import { ProductList } from "./ProductList";
import { MoneyInsert } from "./MoneyInsert";
import { Purchase } from "./Purchase";
import { ReleaseProduct } from "./ReleaseProduct";
import { getProducts } from "../api";

export const BodyMachine = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [insertedMoney, setInsertedMoney] = useState<number>(0);
    const [releasedProduct, setReleasedProduct] =
        useState<ReleasedProduct | null>(null);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(
        null
    );
    const [username, setUsername] = useState<string>("");

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const products = await getProducts();
                setProducts(products);
                setLoading(false);
            } catch (error) {
                setError("An error occurred while processing your request.");
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="body-machine">
            <div className="input-group mb-2" style={{ width: "20%" }}>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your username"
                    onChange={(event) => setUsername(event.target.value)}
                />
            </div>

            {username && (
                <>
                    <ProductList
                        products={products}
                        releasedProduct={releasedProduct}
                        setSelectedProduct={setSelectedProduct}
                    />
                    <MoneyInsert
                        insertedMoney={insertedMoney}
                        releasedProduct={releasedProduct}
                        username={username}
                        setInsertedMoney={setInsertedMoney}
                        setReleasedProduct={setReleasedProduct}
                    />
                    {selectedProduct && (
                        <Purchase
                            selectedProduct={selectedProduct}
                            insertedMoney={insertedMoney}
                            username={username}
                            setReleasedProduct={setReleasedProduct}
                            setInsertedMoney={setInsertedMoney}
                            setSelectedProduct={setSelectedProduct}
                        />
                    )}
                    {releasedProduct && (
                        <ReleaseProduct
                            releasedProduct={releasedProduct}
                            setReleasedProduct={setReleasedProduct}
                        />
                    )}{" "}
                </>
            )}
        </div>
    );
};
