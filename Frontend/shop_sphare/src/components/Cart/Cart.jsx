import React from 'react'
import './Style/cart.css'
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../../features/cartSlice";

const Cart = () => {
  const cart = useSelector((state) => state.cart.cartItems);
  const total = useSelector((state) => state.cart.totalPrice);
  const dispatch = useDispatch();

  return (
    <div className='container text-center my-5' >
      <h2>Shopping Cart</h2>
      <ul >
        {cart.length === 0 ? <p>Cart is empty</p> : (
          <div>
            {cart.map(item => (
              <li className='cart-list ' key={item.id}>
                <img src={item.image} className='cart-img cart-item mx-5' />
                <span className='cart-item mx-5' > {item.title} - ${item.price} (x{item.quantity}) </span>
                <button className='cart-item mx-5'  onClick={() => dispatch(removeFromCart(item))}>Remove</button>
                <span className='cart-item mx-5' >Total: ${total}</span>
              </li>
            ))}
          </div>
        )}
      </ul>
      
    </div>
  )
}

export default Cart
