import React from 'react';
import "./Style/Cart.css";
import Button from '../Button/Button';

const Cart = ({ cart }) => {
  return (
    <div className='container bg-clr my-5'>
      <h2 className='text-center my-4'>Shopping Cart</h2>
      <ul >
        {cart.length === 0 ? <p>Cart is empty</p> : (
          <div>
            {cart.map((item) => (
              <li className='cart-list rounded m-2' key={item.id} >
                <img src={item.image} className='cart-img cart-item mx-5' alt={item.title} />
                <div className=' container '>
                  <div className=' d-flex justify-content-between '>
                    <div className='cart-item mx-5'>{item.title ? item.title.slice(0, 45) : "No Title"}...</div>
                    <div className='cart-item me-5 '> - </div>
                    <div className='cart-item me-5'>${item.price} (x{item.quantity})</div>
                    <button className='btn text-danger ' >
                      <span className="material-symbols-outlined">
                        delete
                      </span>
                    </button>
                  </div>
                  <div className='d-flex ms-5'>
                    <Button className='btn btn-danger fw-bold' btnName={"-"} />
                    <div className='d-flex align-items-center px-3' >{item.quantity}</div>
                    <Button className='btn btn-success fw-bold' btnName={"+"} />
                  </div>
                </div>
              </li>
            ))}
            <div className='cart-total'>
              <span className='d-flex justify-content-end py-3'>Total: ${cart.reduce((total, item) => total + item.price * item.quantity, 0)}</span>
            </div>
          </div>
        )}
      </ul>
    </div>
  );
};

export default Cart;
