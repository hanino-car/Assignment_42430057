import { useContext, useEffect, useState, createContext } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {

    // load the cart from localStorage... if there was nothing, then just an empty array []
    // PARSE is the method that converts the STRING back into a JSON object so we can use its field such as cart[0].id or cart[0].productName...
    const [cart, setCart] = useState(window.localStorage.getItem("cart")? JSON.parse(window.localStorage.getItem("cart")) : [] );


    // useffect will run only on first loading of the page or when the cart value changes 
    // (addToCart, removeItem, clearCart) these functions cause the cart to change therefore the useffect will execute  
    // this useffect is responsible for keeping the localStorage value the same as that of the cart value...
    useEffect(() => {
        // simply store the JSON value on the cart in the localStorage... but first converts it to a String
        window.localStorage.setItem("cart", JSON.stringify(cart)); // stringify is the method the converts from JSON to STRING
        console.log("updated localStorage")
    }, [cart]);



    const addToCart = (product, qnt) => { // takes as parameters the product the user choosed and the quantity
        const tmp = [...cart] // copy the cart into a new array called tmp so we can modify it then update it again later on

        // check if the product is already inside of the cart
        for(let i = 0;  i < tmp.length; i++){

            if(tmp[i].id === product.productId){

                // if the item already exists just increment the qnt with the new added qnt
                tmp[i].qnt = tmp[i].qnt + qnt

                // update the previous cart into the modified cart
                setCart(tmp)

                // exit the function since there no need to continue
                return;
            }

        }

        // if the function didnt return in the for loop this means the item doesnt exists and we need to push a new one
        tmp.push(
            {
                id: product.productId,
                qnt: qnt,
            },
        )
        
        // update the cart
        setCart(tmp)

        // exit the function 
        return;
    };

    const removeItem = (id) => {

        const tmp = [] // make empty array and we will fill it with everything except the item having the specific id

        for(let i = 0; i < cart.length; i++){
            if(cart[i].id !== id){
                tmp.push(cart[i])
            } 
        }

        // update the cart
        setCart(tmp)
    };

    const clearCart = () => {
        // easy peasy 
        setCart([]);
    };

    return (  //a wrapper that gives access to the cart 
        <CartContext.Provider value={{ cart, addToCart, removeItem, clearCart }}>
            {children}
        </CartContext.Provider>
    ); //the values defines what we are sharing across the component
    //children is basically all the components inside the provider like home ..
}

export const useCart = () => useContext(CartContext);  //for a cleaner code instead of useContext(CartContext) we use useCart()