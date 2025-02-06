import React from 'react'
// import './Style/Cart.css'
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../../features/cartSlice";

const Cart = () => {
  const cart = useSelector((state) => state.cart.cartItems);
  const total = useSelector((state) => state.cart.totalPrice);
  const dispatch = useDispatch();

  return (
    <div>
       <h2>Shopping Cart</h2>
      {cart.length === 0 ? <p>Cart is empty</p> : (
        <ul>
          {cart.map(item => (
            <li key={item.id}>
              {item.title} - ${item.price} (x{item.quantity})
              <button onClick={() => dispatch(removeFromCart(item))}>Remove</button>
            </li>
          ))}
        </ul>
      )}
      <h3>Total: ${total}</h3>
    </div>
  )
}

export default Cart
