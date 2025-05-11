import React, {
  createContext,
  useState,
  Suspense,
  lazy,
  useEffect,
} from "react";
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
// const Kid = lazy(() => import("./components/Kid/Kid"));
const Women = lazy(() => import("./components/Women/Women"));
const ContactUs = lazy(() => import("./components/ContactUs/ContactUs"));
const AboutUs = lazy(() => import("./components/AboutUs/AboutUs"));
const LogInSignUp = lazy(() => import("./components/LogInSignUp/LogInSignUp"));
const Electronics = lazy(() => import("./components/Electronics/Electronics"));
const Jewelery = lazy(() => import("./components/Jewelery/Jewelery"));
const SingleProduct = lazy(() =>
  import("./components/SingleProduct/SingleProduct")
);

// Creating context
const themeContext = createContext();

function App() {
  const [mode, setMode] = useState(false);
  const [cartProductId, setCartProductId] = useState("");
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [isLoading, setIsLoading] = useState(true);
  // const [toastShown, setToastShown] = useState(false);

  useEffect(() => {
    const verifyLoggedUser = async () => {
      try {
        const verifyUser = await fetch(
          `http://localhost:3001/api/auth/verify-session-user`,
          {
            method: "GET",
            credentials: "include", // Include cookies for authentication
          }
        );

        if (verifyUser.ok) {
          const sessionData = await verifyUser.json();
          console.log("Session valid:", sessionData);
          setIsLoggedIn(true);
        } else {
          console.log("Session invalid or expired.");
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("Error verifying session:", error);
        setIsLoggedIn(false);
      }
    };

    verifyLoggedUser();
  }, []); // Ensure this runs only once by using an empty dependency array

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

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
    const cartItem = {
      id: product.id || product._id,
      title: product.title,
      price: product.price,
      image: product.image,
      rating: { rate: product.rating?.rate, count: product.rating?.count },
      description: product.description,
      category: product.category,
      quantity: 1,
    };

    try {
      const response = await fetch(
        "http://localhost:3001/api/productcart/addcart",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(cartItem),
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to add to cart");
      }
      const data = await response.json();
      console.log("Cart data:", data);
      setCart((prevCart) => {
        const exists = prevCart.find((item) => item.id === cartItem.id);
        if (exists) {
          return prevCart.map((item) =>
            item.id === cartItem.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          return [...prevCart, cartItem];
        }
      });
    } catch (error) {
      console.error("Error adding to cart:", error);
    }

    const existingItem = cart.find((item) => item.id === cartItem.id);

    if (existingItem) {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === cartItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart((prevCart) => [...prevCart, cartItem]);
    }

    toast.success("Added to cart!");
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

      if (!response.ok) {
        throw new Error("Failed to add to wishlist");
      }

      // Only update state if the request was successful
      setWishlist((prevWishlist) => {
        const exists = prevWishlist.find((item) => item._id === product._id);
        if (exists) {
          return prevWishlist.filter((item) => item._id !== product._id);
        } else {
          toast.success("Added to wishlist!");
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
                    query={query}
                  />
                }
              />

              <Route path="/AboutUs" element={<AboutUs />} />

              <Route path="/ContactUs" element={<ContactUs />} />

              <Route
                path="/LoginSignup"
                element={<LogInSignUp setIsLoggedIn={setIsLoggedIn} />}
              />

              <Route
                path="/Men"
                element={
                  <Men
                    handleWishList={handleWishList}
                    handleCartAddition={handleCartAddition}
                    query={query}
                  />
                }
              />

              <Route
                path="/Cart"
                element={
                  <Cart
                    handleWishList={handleWishList}
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
                    handleCartAddition={handleCartAddition}
                  />
                }
              />

              {/* <Route path="/Kid" element={<Kid handleCartAddition={handleCartAddition} />} /> */}

              <Route
                path="/Women"
                element={
                  <Women
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
                    handleWishList={handleWishList}
                    handleCartAddition={handleCartAddition}
                  />
                }
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
