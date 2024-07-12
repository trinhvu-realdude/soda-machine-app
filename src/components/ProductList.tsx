import { Product, ReleasedProduct } from "../interface";
import "../styles/ProductList.css";

type ProductListProps = {
    products: Product[];
    releasedProduct: ReleasedProduct | null;
    setSelectedProduct: React.Dispatch<React.SetStateAction<Product | null>>;
};

export const ProductList: React.FC<ProductListProps> = ({
    products,
    releasedProduct,
    setSelectedProduct,
}) => {
    const handleSelectProduct = (product: Product) => {
        if (releasedProduct) {
            alert(
                `Please take ${releasedProduct.quantity} ${releasedProduct.name} before selecting.`
            );
        } else {
            setSelectedProduct(product);
        }
    };

    return (
        <div className="d-flex justify-content-evenly mb-4">
            {products.map((product) => (
                <div
                    className="card"
                    style={{ width: "18rem" }}
                    key={product.productId}
                    onClick={() => handleSelectProduct(product)}
                >
                    <img
                        src={product.imageUrl}
                        className="card-img-top"
                        alt={product.name}
                    />
                    <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text">
                            {new Intl.NumberFormat("en-US").format(
                                product.price
                            )}{" "}
                            VND
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};
