import { createContext, useState, Suspense, lazy, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import toast, { Toaster } from "react-hot-toast";

const Navbar = lazy(() => import("./components/Navbar/Navbar"));
const TermsOfUse = lazy(() => import("./components/TermsOfUse/TermsOfUse"));
const Footer = lazy(() => import("./components/Footer/Footer"));
const Cart = lazy(() => import("./components/Cart/Cart"));
const WishList = lazy(() => import("./components/WishList/WishList"));
const Home = lazy(() => import("./components/Home/Home"));
const Men = lazy(() => import("./components/Men/Men"));
const Women = lazy(() => import("./components/Women/Women"));
const ContactUs = lazy(() => import("./components/ContactUs/ContactUs"));
const AboutUs = lazy(() => import("./components/AboutUs/AboutUs"));
const LogInSignUp = lazy(() => import("./components/LogInSignUp/LogInSignUp"));
const Electronics = lazy(() => import("./components/Electronics/Electronics"));
const Jewelery = lazy(() => import("./components/Jewelery/Jewelery"));
const Profile = lazy(() => import("./components/Dashboard/Profile/Profile"));
const SingleProduct = lazy(() =>
  import("./components/SingleProduct/SingleProduct")
);

// Creating context
const themeContext = createContext("");

function App() {
  const [mode, setMode] = useState(false);
  const [cartProductId, setCartProductId] = useState("");
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    const verifyAndFetchUser = async () => {
      try {
        const verifyUser = await fetch(
          `http://localhost:3001/api/auth/verify-session-user`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (verifyUser.ok) {
          const sessionData = await verifyUser.json();
          console.log("Session valid:", sessionData);
          setIsLoggedIn(true);

          const userName = await fetch("http://localhost:3001/api/auth/me", {
            method: "GET",
            credentials: "include",
          });

          if (userName.ok) {
            const fetchedData = await userName.json();
            setName(fetchedData.user.userName);
          }
        } else {
          console.log("Session invalid or expired.");
          setIsLoggedIn(false);
          setName("");
        }
      } catch (error) {
        console.error("Error verifying session:", error);
        setIsLoggedIn(false);
        setName("");
      }
    };

    verifyAndFetchUser();
  }, []);

  const toggleTheme = () => {
    let sun = document.querySelector(".sun");
    let moon = document.querySelector(".moon");
    if (mode === false) {
      setMode(true);
      moon.classList.remove("hide");
      sun.classList.add("hide");
      document.body.style.backgroundColor = "#121212";
      document.body.style.color = "#333333";
    } else {
      setMode(false);
      sun.classList.remove("hide");
      moon.classList.add("hide");
      document.body.style.backgroundColor = "#EAECED";
      document.body.style.color = "#fff";
    }
  };

  // Function to handle adding items to the cart
  const handleCartAddition = async (product) => {
    try {
      if (!isLoggedIn) {
        // Guest: store in localStorage
        let guestCart = JSON.parse(localStorage.getItem("guestCart")) || [];
        // Check BEFORE adding
        const guestExistCart = guestCart.find(
          (item) => item._id === product._id || item.id === product.id
        );

        if (guestExistCart) {
          toast.success("Item already in cart!");
          return;
        }

        // Now it's safe to add
        guestCart.push(product);
        localStorage.setItem("guestCart", JSON.stringify(guestCart));
        toast.success("Added to cart!");
        setCart(guestCart);
      }

      const response = await fetch(
        "http://localhost:3001/api/productcart/addcart",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            productId: product._id,
          }),
          credentials: "include",
        }
      );
      const data = await response.json();
      if (!response.ok) {
        // toast.error(data.message || "Failed to add to cart");
        return;
      }
      // Only update state if the request was successful
      setCart((prevCart) => {
        const exists = prevCart.find((item) => item._id === product._id);
        if (exists) {
          toast.success(data.message);
          return prevCart;
        } else {
          toast.success(data.message);
          return [...prevCart, product];
        }
      });
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error(error.message);
    }
  };

  // Function to handle adding items to the wishlist
  const handleWishList = async (product) => {
    try {
      const response = await fetch(
        "http://localhost:3001/api/wishlistproduct/addwishlist",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ productId: product._id || product.id }),
          credentials: "include",
        }
      );
      const data = await response.json();
      // Only update state if the request was successful
      setWishlist((prevWishlist) => {
        const exists = prevWishlist.find((item) => item._id === product._id);
        if (exists) {
          toast.success(data.message);
          return prevWishlist.filter((item) => item._id !== product._id);
        } else {
          return [...prevWishlist, product];
        }
      });
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      toast.error("Failed to add to wishlist");
    }
  };

  return (
    <>
      <Router>
        <themeContext.Provider value={{ mode, toggleTheme }}>
          <Suspense fallback={<div>Loading...</div>}>
            <Navbar
              cart={cart}
              setQuery={setQuery}
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
              name={name}
              setName={setName}
            />
            <Toaster />
            <Routes>
              <Route
                path="/"
                element={
                  <Home
                    handleWishList={handleWishList}
                    setCartProductId={setCartProductId}
                    handleCartAddition={handleCartAddition}
                    isLoggedIn={isLoggedIn}
                    setCart={setCart}
                    setIsLoggedIn={setIsLoggedIn}
                    query={query}
                  />
                }
              />

              <Route path="/AboutUs" element={<AboutUs />} />

              <Route
                path="/ContactUs"
                element={<ContactUs isLoggedIn={isLoggedIn} />}
              />

              <Route
                path="/LoginSignup"
                element={
                  <LogInSignUp
                    setIsLoggedIn={setIsLoggedIn}
                    setName={setName}
                  />
                }
              />

              <Route
                path="/Men"
                element={
                  <Men
                    handleWishList={handleWishList}
                    handleCartAddition={handleCartAddition}
                    isLoggedIn={isLoggedIn}
                    query={query}
                  />
                }
              />

              <Route
                path="/Cart"
                element={
                  <Cart
                    handleWishList={handleWishList}
                    isLoggedIn={isLoggedIn}
                    cart={cart}
                    setCart={setCart}
                  />
                }
              />

              <Route
                path="/WishList"
                element={
                  <WishList
                    wishlist={wishlist}
                    setWishlist={setWishlist}
                    isLoggedIn={isLoggedIn}
                    handleCartAddition={handleCartAddition}
                  />
                }
              />

              {/* <Route path="/Kid" element={<Kid handleCartAddition={handleCartAddition} />} /> */}

              <Route
                path="/Women"
                element={
                  <Women
                    isLoggedIn={isLoggedIn}
                    handleWishList={handleWishList}
                    handleCartAddition={handleCartAddition}
                    query={query}
                  />
                }
              />

              <Route
                path="/Electronics"
                element={
                  <Electronics
                    isLoggedIn={isLoggedIn}
                    handleWishList={handleWishList}
                    handleCartAddition={handleCartAddition}
                    query={query}
                  />
                }
              />

              <Route
                path="/Jewelery"
                element={
                  <Jewelery
                    isLoggedIn={isLoggedIn}
                    handleWishList={handleWishList}
                    handleCartAddition={handleCartAddition}
                    query={query}
                  />
                }
              />

              <Route
                path="/SingleProduct/:id"
                element={
                  <SingleProduct
                    isLoggedIn={isLoggedIn}
                    handleWishList={handleWishList}
                    handleCartAddition={handleCartAddition}
                  />
                }
              />

              <Route
                path="/Profile"
                element={<Profile setName={setName} />}
              />

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
