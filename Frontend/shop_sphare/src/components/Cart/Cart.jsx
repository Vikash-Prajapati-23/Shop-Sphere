import React from 'react';
import "./Style/Cart.css";
import Button from '../Button/Button';
import { useNavigate } from "react-router-dom";


const Cart = ({ cart, setCart }) => {

  const navigate = useNavigate();
  const handleCardClick = (product) => {
    navigate(`/SingleProduct/${product.id}`); // Navigate to SingleProduct page.
  };

  const handleProductDelete = (id) => {
    const filteredCart = cart?.filter((item) => item?.id !== id);
    setCart(filteredCart);
  }
  const handleProductIncrement = (id) => {
    // Here, the ?. ensures that map() is only called if cart is not undefined or null.
    // If cart is undefined or null, updatedCart will be undefined, and setCart(updatedCart) will not throw an error.
    // Using cart?.map(...) ensures map() is not called on an undefined cart (avoiding runtime errors).
    // Not using cart?.map(...) assumes cart is always defined, which can cause crashes if cart is ever undefined.
    const updatedCart = cart?.map((item) => item.id === id ? { ...item, quantity: item.quantity + 1 } : item);
    setCart(updatedCart);
  }
  const handleProductDecrement = (id) => {
    const updateCart = cart?.map((item) => item.id === id ? { ...item, quantity: item.quantity - 1 } : item).filter((item) => item.quantity > 0);
    setCart(updateCart);
  }



  return (
    <div className='container bg-clr my-5'>
      <h2 className='text-center py-4'>Shopping Cart</h2>
      <ul >
        {cart.length === 0 ? <div className='d-flex align-items-center justify-content-center gap-5 py-4'> <img src='./images/empty-cart.png' ></img> <h4> Your cart is empty.!</h4> </div> : (
          <ul>
            {cart.map((item) => (
              <li className='cart-container cart-list rounded m-2 py-3' key={item.id} >
                     
                <img src={item.image} className=' cart-item mx-5' alt={item.title} onClick={() => handleCardClick(item)} />

                <div className=' d-flex justify-content-between align-items-center'>
                  <div className=' justify-content-between '>
                    <pre className='cart-item '>{item.title.slice(0, 40) || "No Title"}...</pre>
                    <div className=' d-flex align-items-center'>
                      <p>
                        <span className='fw-bold' style={{ color: "gold" }}>★ </span>
                        <span className='me-3' >{item.rating.rate}</span>
                      </p>
                      <p className="fw-bold">Reviews {item.rating.count}</p>
                    </div>
                    <div className=' d-flex justify-content-between align-items-center'>
                      <Button onClick={() => handleProductDecrement(item.id)} className='btn btn-danger fw-bold' btnName={"-"} />
                      <div className='d-flex align-items-center px-3 fw-bold' >{item.quantity}</div>
                      <Button onClick={() => handleProductIncrement(item?.id)} className='btn btn-success fw-bold me-3' btnName={"+"} />
                      {/* <a href='./wishlist' className='btn text-primary ' > */}
                      <Button className='btn btn-info fw-bold ' btnName={"Move to wishlist"} />
                      {/* </a>/ */}
                    </div>
                  </div>

                  <div className='ms-5 align-items-centercart-item me-5 fw-bold '>₹{item.price} (x{item.quantity})</div>

                  <div className='ms-5 align-items-center'>
                    <button onClick={() => handleProductDelete(item.id)} className='btn text-danger ' >
                      <span className="material-symbols-outlined">
                        delete
                      </span>
                    </button>
                  </div>
                </div>
              </li>
            ))}
            <div className='cart-total d-flex justify-content-end'>
              <span className=' mx-3 py-3'>Total: ₹{cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</span>
              <Button className='btn btn-primary fw-bold' btnName={"Place Order"} />
            </div>
          </ul>
        )}
      </ul>
    </div>
  );
};

export default Cart;
