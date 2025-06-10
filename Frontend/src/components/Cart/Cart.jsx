import "./Style/Cart.css";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAddress } from "../../context/addressDetailsContext";
import { useEffect, useState } from "react";

const Cart = ({ cart, setCart, handleWishList, isLoggedIn }) => {
  const [guestCart, setGuestCart] = useState([]);
  const [platformFee, setPlatformFee] = useState(4);
  const [deliveryCost, setDeliveryCost] = useState(40);
  const navigate = useNavigate();
  const { selectedAddress, setSelectedAddress } = useAddress();
  const [allAddresses, setAllAddresses] = useState([]);
  const [isClicked, setIclicked] = useState(false);

  const handleCardClick = (product) => {
    if (product && product.id) {
      navigate(`/SingleProduct/${product.id}`);
    } else {
      toast.error("Product ID not found");
    }
  };

  useEffect(() => {
    if (!isLoggedIn) {
      const updateCart = () => {
        const cart = JSON.parse(localStorage.getItem("guestCart")) || [];
        setGuestCart(cart);
      };

      window.addEventListener("guestCartUpdated", updateCart);
      window.dispatchEvent(new Event("guestCartUpdate"));
      updateCart(); // Sync on mount too

      return () => window.removeEventListener("guestCartUpdated", updateCart);
    }
  });

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/api/productcart/cart",
          {
            method: "GET",
            credentials: "include",
          }
        );
        const data = await response.json();
        setCart(Array.isArray(data) ? data : []);
      } catch (error) {
        toast.error("Failed to fetch cart items");
        setCart([]);
      }
    };
    fetchCart();
  }, [isLoggedIn, setCart]);

  useEffect(() => {
    // Fetch all addresses for the logged-in user
    if (isLoggedIn) {
      fetch("http://localhost:3001/api/auth/savedAddress", {
        method: "GET",
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          setAllAddresses(data.addresses || []);
          // Auto-select first address if none selected
          if (!selectedAddress && data.addresses && data.addresses.length > 0) {
            setSelectedAddress(data.addresses[0]);
          }
        });
    }
  }, [isLoggedIn]);

  const handleProductDelete = async (productId) => {
    if (!isLoggedIn) {
      const filtered = guestCart.filter(
        (product) => product.id !== productId && product._id !== productId
      );
      setGuestCart(filtered);
      localStorage.setItem("guestCart", JSON.stringify(filtered));
      toast.success("Item removed from cart");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3001/api/productcart/removecart/${productId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      const data = await response.json();
      if (!response.ok) {
        toast.error(data.message || "Failed to remove item from cart");
      }
      const filteredCart = cart.filter((product) => product._id !== productId);
      setCart(filteredCart);
      toast.success("Item removed from cart");
    } catch (error) {
      toast.error("Failed to remove item from cart");
    }
  };

  const handleProductIncrement = async (productId) => {
    if (!isLoggedIn) return;

    try {
      const response = await fetch(
        `http://localhost:3001/api/productcart/incrementcart/${productId}`,
        {
          method: "PATCH",
          credentials: "include",
        }
      );
      const data = await response.json();
      if (!response.ok) {
        toast.error(data.message || "Failed to increment item in cart");
      }
      const updatedCart = cart.map((product) =>
        product._id === productId
          ? { ...product, quantity: product.quantity + 1 }
          : product
      );
      setCart(updatedCart);
    } catch (error) {
      toast.error("Failed to increment item in cart");
    }
  };

  const handleProductDecrement = async (productId) => {
    if (!isLoggedIn) return;

    try {
      const response = await fetch(
        `http://localhost:3001/api/productcart/decrementcart/${productId}`,
        {
          method: "PATCH",
          credentials: "include",
        }
      );
      const data = await response.json();
      if (!response.ok) {
        toast.error(data.message || "Failed to decrement item in cart");
      }
      const updatedCart = cart.map((product) =>
        product._id === productId
          ? { ...product, quantity: product.quantity - 1 }
          : product
      );
      setCart(updatedCart);
      if (data.message === "Item removed from cart") {
        const filteredCart = cart.filter(
          (product) => product._id !== productId
        );
        setCart(filteredCart);
      }
    } catch (error) {
      toast.error("Failed to decrement item in cart");
    }
  };

  const handleAddToWishList = (product) => {
    if (!isLoggedIn) {
      navigate("/LoginSignup");
      toast.success("Please log in to add items to your wishlist");
      return;
    }
    handleWishList(product);
    toast.success("Added to wishlist!");
    handleProductDelete(product._id);
  };

  const displayCart = isLoggedIn ? cart : guestCart;

  return (
    <div className="d-flex main-cart">
      {displayCart.length === 0 ? (
        <div className="d-flex align-items-center justify-content-center gap-5 py-4 w-100">
          <img src="./images/empty-cart.png" alt="Empty Cart" />
          <h4>Your cart is empty.!</h4>
        </div>
      ) : (
        <div className="cart-layout-container">
          <section className="section-part my-4">
            <div className="d-flex justify-content-between p-3 m-0 cart-head">
              <div>
                <span className="user-address-bold">Deliver to:</span>
                <span className="mx-1 fw-bold user-address-bold">
                  {selectedAddress?.name || "User Name"}
                </span>
                <span className="fw-bold user-address-bold">
                  ,{selectedAddress?.pincode || "Pincode"}
                </span>
                <span className="mx-1 user-address-bold">
                  ,{selectedAddress?.addressType || "Address Type"}
                </span>
                <div className="user-address-change">
                  {selectedAddress?.address || "User Address"}
                </div>
                {/* Address picker dropdown */}
                {isLoggedIn && allAddresses.length > 0 && (
                  <select
                    className="form-select mt-2"
                    value={selectedAddress?._id || ""}
                    onChange={(e) => {
                      const addr = allAddresses.find(
                        (a) => a._id === e.target.value
                      );
                      if (addr) setSelectedAddress(addr);
                    }}
                  >
                    {allAddresses.map((addr) => (
                      <option key={addr._id} value={addr._id}>
                        {addr.name}, {addr.addressType}, {addr.pincode}
                      </option>
                    ))}
                  </select>
                )}
              </div>
              <div className="d-flex align-items-center ">
                <Button className="change-btn" btnName={"Change"} />
              </div>
            </div>

            <ul className="ul-cart-list pt-2">
              {displayCart.map((product) => (
                <li
                  style={{ backgroundColor: "white" }}
                  className="cart-list m-0 p-4"
                  key={product._id || product.id}
                >
                  <div className=" justify-content-between align-items-center">
                    <div className="product mb-1">
                      <div className="product-details m-0 p-0">
                        <img
                          src={product.image}
                          className="cart-product-img"
                          alt={product.title}
                          onClick={() => handleCardClick(product)}
                        />
                      </div>

                      <div className="product-details-wide">
                        <div>
                          <p className="product-title">
                            {product.title?.slice(0, 51) || "No Title"}...
                          </p>
                          <p className="product-title-rest">
                            {product.title?.slice(51) || ""}
                          </p>
                        </div>

                        <div className="fw-bold mb-2">₹{product.price}</div>
                        <div className="d-flex align-items-center">
                          <p>
                            <span className="fw-bold" style={{ color: "gold" }}>
                              ★{" "}
                            </span>
                            <span className="me-3">{product.rating?.rate}</span>
                          </p>
                          <p className="fw-bold rating-font-size">
                            Reviews {product.rating?.count}
                          </p>
                        </div>
                      </div>

                      <div className="product-details-semiwide">
                        Delivery by sunday, June 17 | Deliver cost
                        <span className="text-decoration-line-through mx-2">
                          ₹{deliveryCost}
                        </span>
                        <span className="text-success">Free</span>
                      </div>
                    </div>
                    <div>
                      <div className="d-flex align-items-center">
                        {isLoggedIn && (
                          <>
                            <Button
                              onClick={() =>
                                handleProductDecrement(product._id)
                              }
                              disabled={product.quantity <= 1}
                              className=" fw-bold quantity-btns"
                              btnName={"-"}
                            />
                            {console.log(
                              "Qty:",
                              product.quantity,
                              typeof product.quantity
                            )}
                            <span className="mx-1 fw-bold product-quantity">
                              {product.quantity}
                            </span>
                            <Button
                              onClick={() =>
                                handleProductIncrement(product._id)
                              }
                              className="quantity-btns-inc fw-bold"
                              btnName={"+"}
                            />
                          </>
                        )}
                        <Button
                          className="btn cart-btns fw-bold ms-4"
                          onClick={() => handleAddToWishList(product)}
                          btnName={"MOVE TO WISHLIST"}
                        />
                        <Button
                          onClick={() =>
                            handleProductDelete(product._id || product.id)
                          }
                          className="btn cart-btns fw-bold"
                          btnName={"REMOVE"}
                        />
                        <div className="ms-5"></div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="cart-total d-flex justify-content-end">
              <Button
                className="fw-bold place-order-btn"
                btnName={"PLACE ORDER"}
              />
            </div>
          </section>

          <aside className="bg-clr bg-white my-4 fixed">
            <div className="borders p-3 fw-bold">PRICE DETAILS</div>
            <div className="p-3">
              <div className="d-flex justify-content-between pb-2">
                <span>
                  Price <span>({cart.length} items)</span>
                </span>
                <span className="">
                  ₹
                  {displayCart
                    .reduce((total, product) => {
                      const qty = product.quantity || 1;
                      return total + product.price * qty;
                    }, 0)
                    .toFixed(2)}
                </span>
              </div>
              <div className="d-flex justify-content-between py-2">
                <span>Discount </span> <span className=" text-success">0</span>
              </div>
              <div className="d-flex justify-content-between py-2">
                <span>Platform fee</span> <span>₹{platformFee} </span>
              </div>
              <div className="d-flex justify-content-between pt-2 pb-3 borders">
                <span>Delivery Charges </span>
                <span>
                  <span className="me-1 text-secondary text-decoration-line-through">
                    ₹{deliveryCost * cart.length}
                  </span>
                  <span className="text-success">Free</span>
                </span>
              </div>
              <div className="d-flex justify-content-between py-3 fw-bold borders">
                <span>Total Amount</span>
                <span>
                  ₹
                  {(
                    displayCart.reduce((total, product) => {
                      const qty = product.quantity || 1;
                      return total + product.price * qty;
                    }, 0) + platformFee
                  ).toFixed(2)}
                </span>
              </div>
              <div className="d-flex justify-content-between fw-bold pt-2 text-success">
                <div>You will save amount on this order.</div>
              </div>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
};

export default Cart;
