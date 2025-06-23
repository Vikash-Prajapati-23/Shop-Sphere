import { createContext, useState, Suspense, lazy, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import toast, { Toaster } from "react-hot-toast";
import { AddressProvider } from "./context/addressDetailsContext";
import { FormDataProvider } from "./context/formDataContext";
import OrderSuccess from "./pages/OrderSuccess/OrderSuccess";
import OrderFailure from "./pages/OrderFailure/OrderFailure";
import MyOrders from "./pages/MyOrders/MyOrders";

const Navbar = lazy(() => import("./components/Navbar/Navbar"));
const TermsOfUse = lazy(() => import("./components/TermsOfUse/TermsOfUse"));
const Footer = lazy(() => import("./components/Footer/Footer"));
const Cart = lazy(() => import("./components/Cart/Cart"));
const WishList = lazy(() => import("./components/WishList/WishList"));
const Home = lazy(() => import("./components/Home/Home"));
const Men = lazy(() => import("./pages/categoryPages/Men/Men"));
const ContactUs = lazy(() => import("./components/ContactUs/ContactUs"));
const AboutUs = lazy(() => import("./components/AboutUs/AboutUs"));
const LogInSignUp = lazy(() => import("./components/LogInSignUp/LogInSignUp"));
const Profile = lazy(() => import("./components/Dashboard/Profile/Profile"));
const SingleProduct = lazy(() =>
  import("./components/SingleProduct/SingleProduct")
);

// Creating context
const themeContext = createContext("");

function App() {
  const [cartProductId, setCartProductId] = useState("");
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState("");
  const [userId, setUserId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [platformFee, setPlatformFee] = useState(4);
  const [deliveryCost, setDeliveryCost] = useState(40);

  const fetchCardQuantity = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/api/productcart/cart`,
        {
          credentials: "include",
        }
      );
      const data = await response.json();
      if (response.ok) {
        setCart(data);
      }
    } catch (error) {
      toast.error("Something went wrong while getting the cart quantity.");
    }
  };

  useEffect(() => {
    const verifyAndFetchUser = async () => {
      try {
        const verifyUser = await fetch(
          `${process.env.REACT_APP_API_BASE_URL}/api/auth/verify-session-user`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (verifyUser.ok) {
          setIsLoggedIn(true);

          const userName = await fetch(
            `${process.env.REACT_APP_API_BASE_URL}/api/auth/me`,
            {
              method: "GET",
              credentials: "include",
            }
          );

          if (userName.ok) {
            const fetchedData = await userName.json();
            setUserId(fetchedData?.user.id);
            setFirstName(fetchedData.user.firstName);
            setLastName(fetchedData.user.lastName);
            setContact(fetchedData.user.contact);
            setName(fetchedData.user.userName);
            setEmail(fetchedData.user.email);
            setGender(fetchedData.user.gender);
            await fetchCardQuantity();
          }
        } else {
          setIsLoggedIn(false);
          setName("");
        }
      } catch (error) {
        console.error("Error verifying session:", error);
        setIsLoggedIn(false);
        setName("");
      }
    };

    verifyAndFetchUser(); // only one async call now
  }, []);

  const handleCartAddition = async (product) => {
    try {
      if (!isLoggedIn) {
        // Guest: store in localStorage
        let guestCart = JSON.parse(localStorage.getItem("guestCart")) || []; // Check BEFORE adding
        const guestExistCart = guestCart.find(
          (item) => item._id === product._id || item.id === product.id
        );

        if (guestExistCart) {
          toast.success("Item already in cart!");
          return;
        }

        guestCart.push(product); // Now it's safe to add
        localStorage.setItem("guestCart", JSON.stringify(guestCart));
        toast.success("Added to cart!");
        setCart(guestCart);
      }

      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/api/productcart/addcart`,
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
        toast.error(data.message || "Failed to add to cart");
        return;
      } // Only update state if the request was successful
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

  const handleWishList = async (product) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/api/wishlistproduct/addwishlist`,
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
          toast.success(data.message);
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
        <AddressProvider>
          <FormDataProvider>
            <Suspense fallback={<div>Loading...</div>}>
              <Navbar
                cart={cart}
                setCart={setCart}
                setQuery={setQuery}
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
                name={name}
                firstName={firstName}
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
                      cart={cart}
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
                  path="/category/:categorySlug"
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
                      name={name}
                      email={email}
                      deliveryCost={deliveryCost}
                      platformFee={platformFee}
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
                  element={
                    <Profile
                      name={name}
                      isLoggedIn={isLoggedIn}
                      setIsLoggedIn={setIsLoggedIn}
                      cart={cart}
                    />
                  }
                />

                <Route
                  path="/MyOrders"
                  element={
                    <MyOrders
                      cart={cart}
                      deliveryCost={deliveryCost}
                      platformFee={platformFee}
                      userId={userId}
                    />
                  }
                />

                <Route path="/OrderSuccess" element={<OrderSuccess />} />
                <Route path="/OrderFaliure" element={<OrderFailure />} />

                <Route path="/TermsOfUse" element={<TermsOfUse />} />
              </Routes>
              <Footer />
            </Suspense>
          </FormDataProvider>
        </AddressProvider>
      </Router>
    </>
  );
}

export default App;
export { themeContext };
