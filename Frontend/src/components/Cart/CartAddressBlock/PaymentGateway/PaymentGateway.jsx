import { useState } from "react";
import Button from "../../../Button/Button";

const PaymentGateway = ({
  name,
  cart,
  currentIndex,
  setCurrentIndex,
  selectedAddress,
}) => {
  const [paymentOption, setPaymentOption] = useState([
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
                <i class="fa-solid fa-check text-primary ms-2"></i>
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
                  <i class="fa-solid fa-check text-primary ms-2"></i>
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
                  <i class="fa-solid fa-check text-primary ms-2"></i>
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
                  <input className="mt-2" type="radio" />
                  <div>
                    <p className="m-0  payment-text"> {data.paymentType} </p>
                    <p className="m-0 pb-2 text-size-checkout"> {data.para} </p>
                  </div>
                </div>
                <Button
                  className={"mb-3 payment-btn"}
                  btnName={"Confirm Order"}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentGateway;
