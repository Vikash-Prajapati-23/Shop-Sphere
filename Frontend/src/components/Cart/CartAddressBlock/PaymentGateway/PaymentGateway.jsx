import React, { useEffect } from "react";

const loadRazorpayScript = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

const PaymentGateway = ({
  amount,
  address,
  cartItems,
  userId,
  onPaymentSuccess,
}) => {
  useEffect(() => {
    loadRazorpayScript("https://checkout.razorpay.com/v1/checkout.js");
  }, []);

  const handlePayment = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}/api/payments/razorpay/order`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ amount }),
      }
    );
    const data = await res.json();
    if (!data || !data.order) {
      alert("Failed to create order");
      return;
    }

    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY_ID,
      amount: data.order.amount,
      currency: data.order.currency,
      name: "E-Commerce Shop",
      description: "Order Payment",
      order_id: data.order.id,
      handler: async function (response) {
        // Send payment details to backend for verification and order creation
        const verifyRes = await fetch(
          `${process.env.REACT_APP_API_BASE_URL}/api/payments/razorpay/verify`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              address,
              cartItems,
              userId,
              amount,
            }),
          }
        );
        const verifyData = await verifyRes.json();
        if (verifyData.success) {
          onPaymentSuccess && onPaymentSuccess(verifyData);
        } else {
          alert("Payment verification failed");
        }
      },
      prefill: {
        name: address?.name || "",
        email: address?.email || "",
        contact: address?.phone || "",
      },
      notes: {
        address: `${address?.street || ""}, ${address?.city || ""}, ${
          address?.state || ""
        }, ${address?.zip || ""}`,
      },
      theme: {
        color: "#3399cc",
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
    rzp.on("payment.failed", function (response) {
      alert("Payment failed. Please try again.");
    });
  };

  return (
    <button className="payment-btn" onClick={handlePayment}>
      Pay Now
    </button>
  );
};

export default PaymentGateway;
