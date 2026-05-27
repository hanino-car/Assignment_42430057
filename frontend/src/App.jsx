import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails"
import Cart from "./pages/Cart"
import Header from "./components/Header"
import { CustomerFeedback } from "./pages/CustomerFeedback";
import { Feedback } from "./feedback";
import { useState } from "react";

function App() {

  const [feedbackList, setFeedbackList] = useState([
    new Feedback("hanin", "Amazing quality and super fast delivery!"),
    new Feedback("Ali", "Great service and good quality!"),
    new Feedback("Mohammad ali", "I really loved the melted clock. Definitely ordering again."),
    new Feedback("Fatima", "One of the best online shopping experiences I had."),
    new Feedback("Mariam", "Customer service was very helpful and friendly.")
  ])

  const onAddButtonClick = (feedbackData) => {
    feedbackList.push(new Feedback(feedbackData.name, feedbackData.text));
    setFeedbackList([...feedbackList]);
  }

  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/Cart" element={<Cart />} />
          <Route
            path="/CustomerFeedback"
            element={
              <CustomerFeedback
                feedbackList={feedbackList}
                onAddButtonClick={onAddButtonClick}
              />
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
