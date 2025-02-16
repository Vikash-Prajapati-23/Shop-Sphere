import React from 'react';
import "./Style/Cart.css";
import Button from '../Button/Button';

const Cart = ({ cart }) => {
  return (
    <div className='container bg-clr my-5'>
      <h2 className='text-center py-4'>Shopping Cart</h2>
      <ul >
        {cart.length === 0 ? <div className='d-flex align-items-center justify-content-center gap-5 py-4'> <img src='./images/empty-cart.png' ></img> <h4> Your cart is empty.!</h4> </div> : (
          <div>
            {cart.map((item) => (
              <li className='cart-container cart-list rounded m-2 py-3' key={item.id} >

                <img src={item.image} className='cart-img cart-item mx-5' alt={item.title} />

                <div className=' d-flex justify-content-between align-items-center'>
                  <div className='   justify-content-between '>
                    <pre className='cart-item '>{item.title.slice(0, 40) || "No Title"}...</pre>
                    <div className=' d-flex align-items-center'>
                      <p className="">
                        <span className='fw-bold' style={{ color: "gold" }}>★ </span>
                        <span className='me-3' >{item.rating.rate}</span>
                      </p>
                      <p className="fw-bold">Reviews {item.rating.count}</p>
                    </div>
                    <div className=' d-flex justify-content-between align-items-center'>
                      <Button className='btn btn-danger fw-bold' btnName={"-"} />
                      <div className='d-flex align-items-center px-3 fw-bold' >{item.quantity}</div>
                      <Button className='btn btn-success fw-bold me-3' btnName={"+"} />
                      <Button className='btn btn-info fw-bold ' btnName={"Move to wishlist"} />
                    </div>
                  </div>

                  <div className=' ms-5 align-items-centercart-item me-5 fw-bold '>${item.price} (x{item.quantity})</div>

                  <div className=' ms-5 align-items-center'>
                    <button className='btn text-danger ' >
                      <span className="material-symbols-outlined">
                        delete
                      </span>
                    </button>
                  </div>
                </div>
              </li>
            ))}
            <div className='cart-total d-flex justify-content-end'>
              <span className=' mx-3 py-3'>Total: ${cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</span>
              <Button className='btn btn-primary fw-bold' btnName={"Place Order"} />
            </div>
          </div>
        )}
      </ul>
    </div>
  );
};

export default Cart;
