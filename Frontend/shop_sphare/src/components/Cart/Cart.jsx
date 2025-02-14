import React from 'react';
import './Style/cart.css';

const Cart = ({ cart }) => {
  return (
    <div className='container-fluid text-center my-5'>
      <h2>Shopping Cart</h2>
      <ul>
        {cart.length === 0 ? <p>Cart is empty</p> : (
          <div>
            {cart.map((item) => (
              <li className='cart-list text-center rounded' key={item.id}>
                <img src={item.image} className='cart-img cart-item mx-5' alt={item.title} />
                <span className='cart-item mx-5'>{item.title} - ${item.price} (x{item.quantity})</span>
                {/* Uncomment and update the remove button functionality if needed */}
                {/* <button className='cart-item mx-5' onClick={() => dispatch(removeFromCart({ id: item.id }))}>Remove</button> */}
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
