const OrderFailure = () => {
  return (
    <div className="max-w-xl mx-auto p-4 text-center">
      <h2 className="text-red-600 text-2xl font-bold">❌ Payment Failed</h2>
      <p className="mt-2">Something went wrong. Please try again.</p>
      <button
        onClick={() => window.location.href = "/cart"}
        className="mt-6 px-4 py-2 bg-red-600 text-white rounded"
      >
        Retry Payment
      </button>
    </div>
  );
};

export default OrderFailure;
