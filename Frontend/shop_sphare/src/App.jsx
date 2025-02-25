import React, { createContext, useState, Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import toast, { Toaster } from 'react-hot-toast';

const Navbar = lazy(() => import("./components/Navbar/Navbar"));
const TermsOfUse = lazy(() => import("./components/TermsOfUse/TermsOfUse"));
const Footer = lazy(() => import("./components/Footer/Footer"));
const Cart = lazy(() => import("./components/Cart/Cart"));
const WishList = lazy(() => import("./components/WishList/WishList"));
const Home = lazy(() => import("./components/Home/Home"));
const Men = lazy(() => import("./components/Men/Men"));
const Kid = lazy(() => import("./components/Kid/Kid"));
const Women = lazy(() => import("./components/Women/Women"));
const ContactUs = lazy(() => import("./components/ContactUs/ContactUs"));
const AboutUs = lazy(() => import("./components/AboutUs/AboutUs"));
const LogInSignUp = lazy(() => import("./components/LogInSignUp/LogInSignUp"));
const Electronics = lazy(() => import("./components/Electronics/Electronics"));
const Jewelery = lazy(() => import("./components/Jewelery/Jewelery"));
const SingleProduct = lazy(() => import("./components/SingleProduct/SingleProduct"));

// Creating context 
const themeContext = createContext();

function App() {
  const [mode, setMode] = useState(false);
  const [cartProductId, setCartProductId] = useState('');
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  const toggleTheme = () => {
    let sun = document.querySelector(".sun");
    let moon = document.querySelector(".moon");
    if (mode === false) {
      setMode(true);
      moon.classList.remove('hide');
      sun.classList.add('hide');
      document.body.style.backgroundColor = '#121212';
      document.body.style.color = '#333333';
    } 
    else {
      setMode(false);
      sun.classList.remove('hide');
      moon.classList.add('hide');
      document.body.style.backgroundColor = '#EAECED';
      document.body.style.color = '#fff';
    }
  };

  // Function to handle adding items to the cart
  const handleCartAddition = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      toast.success(`Product added to cart! ${'🛒'}`);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } 
      else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // Function to handle adding items to the wishlist
  const handleWishList = (product) => {
    setWishlist((prevWishlist) => {
      const existingProduct = prevWishlist.find((item) => item.id === product.id);
      toast.success(`Product added to Wishlist! ${'❤️'}`);
      if (existingProduct) {
        return prevWishlist.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } 
      else {
        return [...prevWishlist, { ...product, quantity: 1 }];
      }
    });
  };

  return (
    <>
      <Router>
        <themeContext.Provider value={{ mode, toggleTheme }}>
          <Suspense fallback={<div>Loading...</div>}>
            <Navbar cart={cart} />
            <Toaster />
            <Routes>
              <Route path="/" element={<Home handleWishList={handleWishList} setCartProductId={setCartProductId} handleCartAddition={handleCartAddition} />} />

              <Route path="/AboutUs" element={<AboutUs />} />

              <Route path="/ContactUs" element={<ContactUs />} />

              <Route path="/LoginSignup" element={<LogInSignUp />} />

              <Route path="/Men" element={<Men handleWishList={handleWishList} handleCartAddition={handleCartAddition} />} />

              <Route path="/Cart" element={<Cart handleW
                ishList={handleWishList} cart={cart} setCart={setCart} handleWishList={handleWishList} />} />

              <Route path="/WishList" element={<WishList wishlist={wishlist} setWishlist={setWishlist} handleCartAddition={handleCartAddition} />} />

              <Route path="/Kid" element={<Kid handleCartAddition={handleCartAddition} />} />

              <Route path="/Women" element={<Women handleWishList={handleWishList} handleCartAddition={handleCartAddition} />} />

              <Route path="/Electronics" element={<Electronics handleWishList={handleWishList} handleCartAddition={handleCartAddition} />} />

              <Route path="/Jewelery" element={<Jewelery handleWishList={handleWishList} handleCartAddition={handleCartAddition} />} />

              <Route path="/SingleProduct/:id" element={<SingleProduct handleWishList={handleWishList} handleCartAddition={handleCartAddition} />} />

              <Route path="/TermsOfUse" element={<TermsOfUse />} />

            </Routes>
            <Footer />
          </Suspense>
        </themeContext.Provider>
      </Router>
    </>
  );
}

export default App;
export { themeContext };