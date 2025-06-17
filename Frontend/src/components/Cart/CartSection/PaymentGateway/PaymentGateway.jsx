import { useState } from "react";
import Button from "../../../Button/Button";
import { api } from "../../../../utils/api";

const PaymentGateway = ({
  name,
  setCart,
  cart,
  currentIndex,
  setCurrentIndex,
  selectedAddress,
  user, // Pass user as prop from parent (Cart)
}) => {
  const [paymentOption] = useState([
    {
      paymentType: "Net Banking",
      para: "Secure and seamless payment experience.",
    },
    {
      paymentType: "Credit / Debit / ATM Card",
      para: "Add your card details as per RBI guidelines",
    },
    {
      paymentType: "Cash on Delivery",
      para: "Hasselfree payments at the time of delivery.",
    },
    {
      paymentType: "UPI",
      para: "Simple & secure payement.",
    },
  ]);
  const [selectedPayment, setSelectedPayment] = useState("");
  const [loading, setLoading] = useState(false);

  const placeOrder = async () => {
    if (!selectedPayment) return alert("Please select a payment method.");
    if (!user || !user._id) return alert("User not logged in!");
    if (!selectedAddress) return alert("No address selected!");
    if (!cart || cart.length === 0) return alert("Cart is empty!");
    setLoading(true);
    try {
      // Calculate total amount from cart
      const amount = Math.round(
        cart.reduce(
          (sum, item) => sum + item.price * (item.quantity || 1),
          0 * 100
        )
      );
      // Step 1: Create Razorpay order
      const res = await fetch(api("/api/payments/create-order"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
        credentials: "include",
      });
      const data = await res.json();
      if (!data.id) throw new Error("Order creation failed");
      // Step 2: Razorpay options
      const options = {
        key: process.env.REACT_APP_RAZOR_PAY_TEST_API_KEY,
        amount: data.amount,
        currency: data.currency,
        name: "Shopsphere",
        description: "Order Payment",
        order_id: data.id,
        handler: async function (response) {
          // Step 3: Send to backend to verify & save order/payment
          const saveRes = await fetch(api("/api/payments/save-payment"), {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              amount,
              userId: user._id,
              cart,
              address: selectedAddress,
              paymentType: selectedPayment,
            }),
          });
          const saveData = await saveRes.json();
          console.log("SAVE RESPONSE:", saveData);
          if (!saveRes.ok)
            throw new Error(saveData.message || "Payment saving failed");
          window.location.href = `/OrderSuccess?payment_id=${response.razorpay_payment_id}&order_id=${response.razorpay_order_id}`;
        },
        prefill: {
          name: user.name || user.userName || "User",
          email: user.email || "email@example.com",
          contact: user.mobile || "9999999999",
        },
        theme: { color: "#3399cc" },
      };
      setCart([])
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      window.location.href = `/OrderFailure`;
      console.error("Error placing order:", err);
      alert("Payment failed! Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex">
      <div className="all-addresses-checkout">
        {/* Login Details...  */}
        <div className="bg-white mb-3 p-1 ps-4 py-2 bg-primary box-shadow-heads">
          <div className="d-flex justify-content-between">
            <div className="d-flex align-items-center gap-3">
              <div className="all-addresses-checkout-index bg-light text-primary">
                {currentIndex - 3}
              </div>
              <div>
                <span className="text-secondary fw-bold">LOGIN</span>
                <i className="fa-solid fa-check text-primary ms-2"></i>
              </div>
            </div>
          </div>

          <div className="ordersummary-head mt-2">
            <span className="me-2 head-text-size"> {name} </span>
            <span> {selectedAddress.mobile} </span>
          </div>
        </div>

        {/* Delivery details...  */}
        <div className="d-flex justify-content-between align-items-center bg-white mb-3 p-1 ps-4 py-2 bg-primary box-shadow-heads">
          <div className="">
            <div className="d-flex justify-content-between">
              <div className="d-flex align-items-center gap-3">
                <div className="all-addresses-checkout-index bg-light text-primary">
                  {currentIndex - 2}
                </div>
                <div>
                  <span className="text-secondary fw-bold">
                    DELIVERY ADDRESS
                  </span>
                  <i className="fa-solid fa-check text-primary ms-2"></i>
                </div>
              </div>
            </div>

            <div className="ordersummary-head mt-2">
              <span className="me-2 head-text-size">
                {" "}
                {selectedAddress.name}{" "}
              </span>
              <span> {selectedAddress.address} </span>
            </div>
          </div>

          <Button
            onClick={() => setCurrentIndex(2)}
            btnName="CHANGE"
            className="fw-bold px-5 py-2 me-3 change-btn"
          />
        </div>

        {/* Summary details...  */}
        <div className="d-flex justify-content-between align-items-center bg-white mb-3 p-1 ps-4 py-2 bg-primary box-shadow-heads">
          <div className="">
            <div className="d-flex justify-content-between">
              <div className="d-flex align-items-center gap-3">
                <div className="all-addresses-checkout-index bg-light text-primary">
                  {currentIndex - 1}
                </div>
                <div>
                  <span className="text-secondary fw-bold">ORDER SUMMARY</span>
                  <i className="fa-solid fa-check text-primary ms-2"></i>
                </div>
              </div>
            </div>

            <div className="ordersummary-head mt-2">
              {/* <span className="me-2 head-text-size"> {selectedAddress.name} </span> */}
              <span className="fw-bold"> {cart.length} items </span>
            </div>
          </div>

          <Button
            onClick={() => setCurrentIndex(3)}
            btnName="CHANGE"
            className="fw-bold px-5 py-2 me-3 change-btn"
          />
        </div>

        {/* Payment details...  */}
        <div>
          <h5 className="d-flex gap-3 bg-primary text-white mb-0 py-3 px-4">
            <span className="all-addresses-checkout-index bg-light text-primary">
              {currentIndex}
            </span>{" "}
            ORDER SUMMARY
          </h5>
          <div className="bg-white">
            {paymentOption.map((data, index) => (
              <div key={index} className="borders pt-2 ps-4">
                <div className="d-flex align-items-start gap-3 ">
                  <input
                    className="mt-2"
                    type="radio"
                    name="paymentType"
                    value={data.paymentType}
                    checked={selectedPayment === data.paymentType}
                    onChange={() => setSelectedPayment(data.paymentType)}
                  />
                  <div>
                    <p className="m-0  payment-text"> {data.paymentType} </p>
                    <p className="m-0 pb-2 text-size-checkout"> {data.para} </p>
                  </div>
                </div>
                {selectedPayment === data.paymentType && (
                  <Button
                    className={"mb-3 payment-btn"}
                    btnName={loading ? "Processing..." : "Confirm Order"}
                    onClick={placeOrder}
                    disabled={loading}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentGateway;
