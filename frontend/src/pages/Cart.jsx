import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2, ShoppingCart, ArrowLeft } from "lucide-react";
import { useCart } from "../contexts/CartContext";
import { productsData } from "../productsData";
import "../css/cart.css";
import "../css/productDetailsStyle.css";

export default function CartPage() {
    const navigate = useNavigate();
    const { cart, removeItem, clearCart } = useCart(); //accessing  cart, removeItem, clearCart  from the context

    // main array because cart only contains id and qty other info are missing
    const cartItems = [];

    // loop for each item and get the actuall item data and store them in cartItems array above
    for (let i = 0; i < cart.length; i++) {
        const cartItem = cart[i];

        const product = productsData.find((p) => p.productId === cartItem.id); //search in my product if one of them matches the id in my cart and store it in product

        if (product) { // if a product was found with the id in the cart calculate the price after sale and store it in the array
            let finalPrice = product.price;

            if (product.isOnSale) {
                finalPrice = Math.round(product.price * (1 - product.saleAmount / 100)); //if the product is on sale change the value to final price to the price on sale
            }

            // pushing the data into the array cartItems
            cartItems.push({
                id: cartItem.id,
                qnt: cartItem.qnt,
                product: product,
                unitPrice: finalPrice, // price after sale calculated above (if it's on sale)
                totalPrice: finalPrice * cartItem.qnt, // total price is the price after sale times qnt
            });
        }
    }


    // total items
    let totalItems = cart.length;

    let totalPrice = 0;
    for (let i = 0; i < cartItems.length; i++) {
        totalPrice += cartItems[i].totalPrice;
    }


    return (
        <div className="cart-outer-div">
            <div className="cart-inner-div">

                <div className="back_btn_div">
                    <button
                        className="back-btn"
                        onClick={() => navigate("/")}>
                        <ArrowLeft size={15} />
                        <p className="back-btn-text">Back</p>
                    </button>
                </div>

                <div className="cart-quantity-div">
                    <div className="cart-quantity-icon">
                        <ShoppingCart size={22} />
                    </div>

                    <div>
                        <h1 className="cart-quantity-title">Your Cart</h1>
                        <p className="cart-quantity-text">{totalItems} item in cart</p>
                    </div>
                </div>

                <div className="cart-lower-part">

                    <div className="cart-items">

                        <div className="cart-items-top">
                            <h2 className="cart-items-title">Items</h2>
                            <button
                                className="cart-clear-btn"
                                onClick={clearCart}>
                                Clear Cart
                            </button>
                        </div>

                        {cartItems.length === 0 ? (
                            <div className="cart-empty">
                                <p className="cart-empty-title">Your cart is empty</p>
                                <p className="cart-empty-text">
                                    Add some products and they will appear here.
                                </p>

                                <button
                                    className="continue-shopping-btn"
                                    onClick={() => navigate("/")}>
                                    Continue Shopping
                                </button>
                            </div>
                        ) : (
                            <div className="cart-items-list">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="cart-item">
                                        <div className="cart-item-image-div">
                                            <img
                                                src={item.product.productImages[0].url}
                                                alt={item.product.productImages[0].alt}
                                                className="cart-item-image"/>
                                        </div>

                                        <div className="cart-item-info-remove-price">
                                            <div className="cart-item-info-remove">
                                                <div>
                                                    <p className="cart-item-name">{item.product.name}</p>
                                                    <p className="cart-item-text">Color: {item.product.color.main}</p>
                                                    <p className="cart-item-text">quantity: {item.qnt}</p>
                                                </div>

                                                <button
                                                    className="cart-remove-btn"
                                                    onClick={() => removeItem(item.id)}>
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>

                                            <div className="cart-item-price-div">
                                                {item.product.isOnSale ? (
                                                    <div className="cart-item-sale-price-div">
                                                        <p className="cart-item-old-price">${item.product.price * item.qnt}</p>
                                                        <p className="cart-item-sale-price">${item.totalPrice}</p>
                                                    </div>
                                                ) : (
                                                    <p className="cart-item-sale-price">
                                                        ${item.totalPrice}
                                                    </p>)}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                    </div>

                    <div className="summary-checkout-div">
                        <div className="cart-items">
                            <h2 className="title">Order Summary</h2>

                            <div className="summary-row">
                                <p>Items</p>
                                <p>{totalItems}</p>
                            </div>

                            <div className="summary-row">
                                <p>Total</p>
                                <p className="summary-total">${totalPrice}</p>
                            </div>
                        </div>

                        <div className="checkout-div">
                            <h2 className="title">Checkout</h2>

                            <div className="checkout-input-div">
                                <p>Name</p>
                                <input
                                    type="text"
                                    className="checkout-input"
                                    placeholder="Enter your name"/>
                            </div>

                            <div className="checkout-input-div">
                                <p>Phone</p>
                                <input
                                    type="text"
                                    className="checkout-input"
                                    placeholder="Enter your phone"/>
                            </div>

                            <div className="checkout-input-div">
                                <p>Location</p>
                                <input
                                    type="text"
                                    className="checkout-input"
                                    placeholder="Enter your location"/>
                            </div>

                            <button className="checkout-submit-btn">Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}