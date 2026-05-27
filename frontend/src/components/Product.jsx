import { useNavigate } from "react-router-dom";
import "../css/stylesheet.css";
import { MessageCircle } from "lucide-react";

function Product({ product }) {

  const navigate = useNavigate()

  return (
    <div className="product_outer_div">
      <div className="product_inner_div">
        {product.availabilityStatus === "sold_out" && (
          <div className="badge">Sold out</div> //if the availability status is sold out the bagde will contain sold out
        )}

        {product.isOnSale && (
          <div className="badge">
            {product.saleAmount}% OFF 
          </div> //if the product is on sale the badge will contain the sale amount
        )}

        <img
          src={product.productImages?.[0]?.url} //this access the src and alt of the first image inside the productImages array but only if the array and object exist
          alt={product.productImages?.[0]?.alt}
          className="product_img" /> 

        <h2 className="product_name">{product.name}</h2>

        <p className="product_color">Color: {product.color.main}</p>

        {product.isOnSale ? ( //if the product is on sale , cross out the price and display the sale product
          <div className="price_box">
            <p className="initial_price">{product.price}$</p>
            <p className="onSale_price">{Math.round(product.price * (1 - product.saleAmount / 100))}$</p>
          </div>) : (
          <p className="product_price">{product.price}$</p>
        )} 
        <div className="btn_container">
          <button onClick={() => navigate(`/product/${product.productId}`)} className="view_and_buy_and_wtsp_btns">View / Buy</button>
          <button onClick={() => {
            window.open("https://wa.me/96181984172", "_blank");
          }} className="view_and_buy_and_wtsp_btns"><MessageCircle className="whatsapp_icon" /></button>
        </div>

      </div>

    </div>
  );
}

export default Product;