import React, { createContext, useState, Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

const Navbar = lazy(() => import("./components/Navbar/Navbar"));
const TermsOfUse = lazy(() => import("./components/TermsOfUse/TermsOfUse"));
const Footer = lazy(() => import("./components/Footer/Footer"));
const Cart = lazy(() => import("./components/Cart/Cart"));
const Home = lazy(() => import("./components/Home/Home"));
const Men = lazy(() => import("./components/Men/Men"));
const Kid = lazy(() => import("./components/Kid/Kid"));
const Women = lazy(() => import("./components/Women/Women"));
const ContactUs = lazy(() => import("./components/ContactUs/ContactUs"));
const AboutUs = lazy(() => import("./components/AboutUs/AboutUs"));
const LogInSignUp = lazy(() => import("./components/LogInSignUp/LogInSignUp"));
const Electronics = lazy(() => import("./components/Electronics/Electronics"));
const Jewelery = lazy(() => import("./components/Jewelery/Jewelery"));
const Alert = lazy(() => import("./components/Alert/Alert"));
const SingleProduct = lazy(() => import("./components/SingleProduct/SingleProduct"));

// Creating context 
const alertContext = createContext();
const themeContext = createContext();

function App() {
  const [alert, setAlert] = useState(null);
  const [mode, setMode] = useState(false);
  const [cartProductId, setCartProductId] = useState('');
  const [cart, setCart] = useState([]);
  
  const toggleTheme = () => {
    let sun = document.querySelector(".sun");
    let moon = document.querySelector(".moon");
    if (mode === false) {
      setMode(true);
      moon.classList.remove('hide');
      sun.classList.add('hide');
      document.body.style.backgroundColor = '#121212';
      document.body.style.color = '#333333';
      showAlert("Switch to Dark mode.", "green");
    } else {
      setMode(false);
      sun.classList.remove('hide');
      moon.classList.add('hide');
      document.body.style.backgroundColor = '#EAECED';
      document.body.style.color = '#fff';
      showAlert("Switch to Light mode.", "blue");
    }
  };

  const showAlert = (message, type) => {
    setAlert({
      message: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };

  // Function to handle adding items to the cart
  const handleCartAddition = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  return (
    <>
      <Router>
        <themeContext.Provider value={{ mode, toggleTheme }}>
          <Suspense fallback={<div>Loading...</div>}>
            <Navbar cart={cart} />
            <alertContext.Provider value={{ alert, showAlert }}>
              <Routes>
                <Route path="/" element={<Home setCartProductId={setCartProductId} handleCartAddition={handleCartAddition} />} />
                <Route path="/AboutUs" element={<AboutUs />} />
                <Route path="/ContactUs" element={<ContactUs />} />
                <Route path="/LoginSignup" element={<LogInSignUp />} />
                <Route path="/Men" element={<Men handleCartAddition={handleCartAddition} />} />
                <Route path="/Cart" element={<Cart cart={cart} handleCartAddition={handleCartAddition} />} />
                <Route path="/Kid" element={<Kid handleCartAddition={handleCartAddition} />} />
                <Route path="/Women" element={<Women handleCartAddition={handleCartAddition} />} />
                <Route path="/Electronics" element={<Electronics handleCartAddition={handleCartAddition} />} />
                <Route path="/Jewelery" element={<Jewelery handleCartAddition={handleCartAddition} />} />
                <Route path="/SingleProduct/:id" element={<SingleProduct handleCartAddition={handleCartAddition} />} />
                <Route path="/TermsOfUse" element={<TermsOfUse />} />
              </Routes>
            </alertContext.Provider>
            <Footer />
          </Suspense>
        </themeContext.Provider>
      </Router>
    </>
  );
}

export default App;
export { alertContext, themeContext };