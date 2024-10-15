import React, { useEffect, useState } from "react";
import { PropagateLoader } from "react-spinners";
import { useNavigate, useLocation } from "react-router-dom";

const Success = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  // Extract cart data from the location state
  const { cartItems = [], totalQty = 0, totalPrice = 0 } = location.state || {};

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer); // Cleanup on unmount
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {loading ? (
        <PropagateLoader color="#36d7b7" />
      ) : (
        <div className="text-center">
          <h2 className="text-3xl font-semibold mb-4">Order Successful!</h2>
          <p>Your order has been successfully placed 🎉</p>

          <h2 className="text-xl font-semibold my-3">Order Summary</h2>

          <ul className="mb-5">
            {cartItems.map((item) => (
              <li key={item.id} className="mb-2">
                {item.name} - {item.qty} x ₹{item.price} = ₹{item.qty * item.price}
              </li>
            ))}
          </ul>

          <h3 className="font-semibold">Total Items: {totalQty}</h3>
          <h3 className="font-semibold">Total Amount: ₹{totalPrice}</h3>

          <button
            onClick={() => navigate("/")}
            className="px-5 py-2 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600"
            style={{ marginTop: "20px" }}
          >
            Let's Order More
          </button>
        </div>
      )}
    </div>
  );
};

export default Success;
