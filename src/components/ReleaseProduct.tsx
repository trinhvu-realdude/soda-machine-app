import React from "react";
import { ReleasedProduct } from "../interface";
import "../styles/ReleaseProduct.css";

type ReleasedProductProps = {
    releasedProduct: ReleasedProduct;
    setReleasedProduct: React.Dispatch<
        React.SetStateAction<ReleasedProduct | null>
    >;
};

export const ReleaseProduct: React.FC<ReleasedProductProps> = ({
    releasedProduct,
    setReleasedProduct,
}) => {
    return (
        <>
            <div className="released-product">
                <img
                    src={releasedProduct.imageUrl}
                    alt={releasedProduct.name}
                    className="product-image"
                    style={{ height: "180px" }}
                />
                <div className="centered">{releasedProduct.quantity}</div>
            </div>
            <button
                className="btn btn-primary mt-2"
                onClick={() => setReleasedProduct(null)}
            >
                Take it
            </button>
        </>
    );
};
