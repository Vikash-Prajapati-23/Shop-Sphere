import { useSearchParams } from "react-router-dom";

const OrderSuccess = () => {
  const [params] = useSearchParams();

  const paymentId = params.get("payment_id");
  const orderId = params.get("order_id");

  return (
    <div className="max-w-xl mx-auto p-4 text-center">
      <h2 className="text-green-600 text-2xl font-bold">🎉 Payment Successful!</h2>
      <p className="mt-2">Thank you for your order.</p>
      <div className="mt-4 bg-gray-100 p-4 rounded shadow">
        <p><strong>Payment ID:</strong> {paymentId}</p>
        <p><strong>Order ID:</strong> {orderId}</p>
      </div>
      <button
        onClick={() => window.location.href = "/"}
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Continue Shopping
      </button>
    </div>
  );
};

export default OrderSuccess;
