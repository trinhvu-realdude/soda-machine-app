import { createTransaction } from "../api";
import { Product, ReleasedProduct } from "../interface";

type PurchaseProps = {
    selectedProduct: Product;
    insertedMoney: number;
    username: string;
    setReleasedProduct: React.Dispatch<
        React.SetStateAction<ReleasedProduct | null>
    >;
    setInsertedMoney: React.Dispatch<React.SetStateAction<number>>;
    setSelectedProduct: React.Dispatch<React.SetStateAction<Product | null>>;
};

export const Purchase: React.FC<PurchaseProps> = ({
    selectedProduct,
    insertedMoney,
    username,
    setReleasedProduct,
    setInsertedMoney,
    setSelectedProduct,
}) => {
    const handlePurchase = async () => {
        if (selectedProduct) {
            const totalCost = selectedProduct.price;
            if (insertedMoney >= totalCost) {
                const transaction = await createTransaction(
                    selectedProduct,
                    username
                );

                if (transaction.status === "COMPLETED") {
                    if (transaction.isWin) {
                        alert(
                            `Congratulations! You purchased 1 ${selectedProduct.name} and won a free product!`
                        );
                        setReleasedProduct({
                            name: selectedProduct.name,
                            imageUrl: selectedProduct.imageUrl,
                            quantity: 2,
                            transactionId: transaction.transactionId,
                        });
                    } else {
                        alert(
                            `Purchased 1 ${selectedProduct.name} for ${totalCost} VND.`
                        );
                        setReleasedProduct({
                            name: selectedProduct.name,
                            imageUrl: selectedProduct.imageUrl,
                            quantity: 1,
                            transactionId: transaction.transactionId,
                        });
                    }
                    setInsertedMoney((prev) => prev - totalCost);
                    setSelectedProduct(null);
                }
            } else {
                alert("Not enough money inserted.");
            }
        }
    };

    return (
        <div className="purchase-section">
            <h2>Purchase {selectedProduct.name}</h2>
            {/* <label>
                Quantity:
                <input
                    type="number"
                    value={selectedQuantity}
                    onChange={handleQuantityChange}
                    min="1"
                />
            </label> */}
            <button
                className="btn btn-outline-primary"
                onClick={handlePurchase}
            >
                Purchase
            </button>
        </div>
    );
};
