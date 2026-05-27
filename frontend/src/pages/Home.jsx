import Product from "../components/Product";
import { productsData } from "../productsData";
import Footer from "../components/footer";
import { useState } from "react";
import { X } from "lucide-react"; //lucide react is a react library for icons
import "../css/stylesheet.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { CustomerFeedback } from "./CustomerFeedback";
import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";


function Home() {

  const [theButtonPressed, setTheButtonPressed] = useState("All");
  const [activeFilter, setActiveFilter] = useState("All");
  const navigate = useNavigate();

  function buttonLook(style) {
    return theButtonPressed === style ? "active_btn" : "inactive_btn";
  }

  const filteredProducts = productsData.filter((product) => {
    if (activeFilter === "All") return true; //all my items in the array
    if (activeFilter === "Top Sellers") return product.isBestSeller; //only best sellers will be in the array
    if (activeFilter === "On Sale") return product.isOnSale; //only on sale 
    if (activeFilter === "Coming soon") return product.availabilityStatus === "coming_soon"; //only coming soon
  });

  return (
    <div className="page">


      <div className="filter_container">

        <div className="filter_buttons">

          <button
            className={`filter_btn ${buttonLook("Top Sellers")}`}
            onClick={() => {
              setTheButtonPressed("Top Sellers");
              setActiveFilter("Top Sellers");
            }}>Best Sellers
          </button>

          <button
            className={`filter_btn ${buttonLook("On Sale")}`}
            onClick={() => {
              setTheButtonPressed("On Sale");
              setActiveFilter("On Sale");
            }}>On Sale
          </button>

          <button
            className={`filter_btn ${buttonLook("Coming soon")}`}
            onClick={() => {
              setTheButtonPressed("Coming soon");
              setActiveFilter("Coming soon");
            }}>Coming Soon
          </button>

          <button
            className="reset_btn"
            onClick={() => {
              setTheButtonPressed("All");
              setActiveFilter("All");
            }}><X size={20} />
          </button>

        </div>

        <div className="feedback-icon-div">
          <button
            className="feedback-icon"
            onClick={() => navigate("/CustomerFeedback")}
          >
            <Heart size={18} />
          </button>
        </div>
        <div className="products_container row g-3"> 
          {filteredProducts.length === 0 ? (
            <p className="empty_text">
              {activeFilter === "Top Sellers" && "No best sellers available"} 
              {activeFilter === "On Sale" && "No products on sale"}
              {activeFilter === "Coming soon" && "No products coming soon"}
              {activeFilter === "All" && "No products to show"}
            </p>) : //if a filter is choosen and no product is available in this condition display a message matching the filter
            (
              filteredProducts.map((product) => (
                <div
                  key={product.productId}
                  className="col-12 col-md-4 col-lg-3 col-xl-2">
                  <Product product={product} />
                </div>
              ))
            )}
        </div> 

      </div>

      <Footer />

    </div>
  );
}

export default Home;

