import React from 'react';
import "./Style/Cart.css";

const Cart = ({ cart }) => {
  return (
    <div className='container-fluid text-center my-5'>
      <h2>Shopping Cart</h2>
      <ul >
        {cart.length === 0 ? <p>Cart is empty</p> : (
          <div>
            {cart.map((item) => (
              <li className='cart-list rounded m-2 d-flex' key={item.id} >
                <img src={item.image} className='cart-img cart-item mx-5' alt={item.title} />
                <div className='cart-item mx-5'>{item.title ? item.title.slice(0, 25) : "No Title"} - ${item.price} (x{item.quantity})</div>
                <button className='btn text-danger ' >
                  <span className="material-symbols-outlined">
                    delete
                  </span>
                </button>
              </li>
            ))}
            <div className='cart-total'>
              <span>Total: ${cart.reduce((total, item) => total + item.price * item.quantity, 0)}</span>
            </div>
          </div>
        )}
      </ul>
    </div>
  );
};

export default Cart;
