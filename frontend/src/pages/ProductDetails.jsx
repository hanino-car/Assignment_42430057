import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { productsData } from "../productsData";
import { Plus, Minus, ArrowDown, ArrowLeft } from "lucide-react";
import "../css/productDetailsStyle.css";
import { useCart } from "../contexts/CartContext";

function ProductDetails() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { addToCart, clearCart } = useCart()
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [openDesc, setOpenDesc] = useState(false);

    function decrease() { //function that decrease the qty only if the quantity is >1 
        if (quantity > 1) {
            setQuantity(quantity - 1);
        } else {
            setQuantity(1);
        }
    }

    function increase() { //function that increase the qty only if the quantity is less than 100 
        if (quantity < 100) {
            setQuantity(quantity + 1);
        }
    }

    useEffect(() => { 
        const res = productsData.find((p) => p.productId === id);
        setProduct(res);
    }, [id]); //every time the id changes useEffect will work

    if (!product) { //if i dont have products (or they didnt return yet) display loading..
        return <p className="product-loading">Loading...</p>;
    }

    return (
        <div className="product-details-page">

            <div className="product-details-container">

                <div className="back_btn_div">
                    <button
                        className="back-btn"
                        onClick={() => navigate("/")}>
                        <ArrowLeft size={15} />
                        <p className="back-btn-text">Back</p>
                    </button>
                </div>

                <div className="product-image-container">
                    <img
                        src={product.productImages[0].url}
                        className="product-image" />
                </div>

                <div className="product-info-container">

                    <div className="first-row">

                        <div className="size-div">
                            <p className="size-title">SIZE</p>
                            <p className="size-value">
                                {`${product.size.length} cm × ${product.size.width} cm × ${product.size.height} cm`}
                            </p>
                        </div>

                        <div className="color-div">
                            <p className="color-title">COLOR</p>
                            <p className="color-value">{product.color.main}</p>
                        </div>
                    </div>

                    <div className="materials-div">
                        <p className="materials-title">MATERIALS</p>
                        <div className="materials-values">
                            {product.materials.map((material) => (
                                <div key={material} className="material-value">
                                    <p className="material-value-text">{material}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="colors-div">
                        <p className="colors-title">OTHER COLORS</p>
                        <div className="colors-values">
                            {product.color.variants.map((hex) => (
                                <div
                                    key={hex}
                                    className="color-value"
                                    style={{ backgroundColor: hex }} />
                            ))}
                        </div>
                    </div>

                    <div className="quantity-price-row">
                        <div className="quantity-controls">
                            <button
                                onClick={decrease}
                                className="quantity-btn">
                                <Minus className="quantity-btn-icon" />
                            </button>

                            <p className="quantity-value">{quantity}</p>

                            <button
                                onClick={increase}
                                className="quantity-btn">
                                <Plus className="quantity-btn-icon" />
                            </button>
                        </div>

                        <div className="price-div">
                            {product.isOnSale ? (
                                <div className="sale-price-div">
                                    <p className="old-price">
                                        {product.price * quantity}$
                                    </p>
                                    <p className="sale-price">
                                        {Math.round(
                                            product.price *
                                            (1 - product.saleAmount / 100) * quantity)}$
                                    </p>
                                </div>
                            ) : (
                                <p className="normal-price">
                                    {product.price * quantity}$
                                </p>
                            )}
                        </div>
                    </div>

                </div>
                <div className="action-btns">
                    <button
                        className="action-btn add-to-cart-btn" 
                        onClick={() => {
                            addToCart(product, quantity);
                            navigate("/cart")
                        }}>Add to Cart
                    </button>
                </div>
                <div
                    onClick={() => setOpenDesc((prev) => !prev)}
                    className="description-div">
                    <div
                        className="description-header">
                        <p className="description-title">DESCRIPTION</p>
                        <ArrowDown
                            size={15}
                            className="description-arrow"
                            style={{
                                transform: openDesc ? "rotate(-180deg)" : "rotate(0deg)",
                            }}/> 
                    </div>
                    <div
                        className={`description-content ${openDesc ? "description-content-open" : "description-content-closed"
                            }`}>
                        {product.description.map((desc) => (
                            <div key={desc} className="description-part">
                                {desc}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetails;