import { useSearchParams } from "react-router-dom";

const OrderSuccess = () => {
  const [params] = useSearchParams();

  const paymentId = params.get("payment_id");
  const orderId = params.get("order_id");

  return (
    <div className="w-50 my-5 mx-auto text-center order-success">
      <h1 className="text-green-600 text-2xl font-bold">🎉 Payment Successful!</h1>
      <p className="mt-2">Thank you for your order.</p>
      <div className="mt-4 mb-5 bg-white p-4 rounded shadow">
        <p><strong>Payment ID:</strong> {paymentId}</p>
        <p><strong>Order ID:</strong> {orderId}</p>
      </div>
      <button
        onClick={() => window.location.href = "/"}
        className="px-5 py-3 bg-blue-600 text-primary border-0 bg-white rounded"
      >
        Continue Shopping
      </button>
    </div>
  );
};

export default OrderSuccess;
