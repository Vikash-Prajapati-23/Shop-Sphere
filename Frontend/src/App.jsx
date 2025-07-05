import { useState, Suspense, lazy, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import toast, { Toaster } from "react-hot-toast";
import OrderSuccess from "./pages/OrderSuccess/OrderSuccess";
import OrderFailure from "./pages/OrderFailure/OrderFailure";
import MyOrders from "./pages/MyOrders/MyOrders";
import { useCartData } from "./context/allCartData";

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

function App() {
  const [wishlist, setWishlist] = useState([]);
  const [query, setQuery] = useState("");
  const [name, setName] = useState("");
  const [userId, setUserId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [platformFee, setPlatformFee] = useState(4);
  const [deliveryCost, setDeliveryCost] = useState(40);
  const [clicked, setClicked] = useState(false); // It is for wishlist.jsx
  const navigate = useNavigate();
  const { setIsLoggedIn } = useCartData();

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

  const handleUserLogout = async () => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/api/auth/logout`,
        {
          method: "GET",
          credentials: "include", // sends cookie!
        }
      );
      if (res.ok) {
        setIsLoggedIn(false); // update local state
        navigate("/LoginSignup");
        toast.success("Logged out successfully!");
      } else {
        toast.error("Logout failed");
      }
    } catch (error) {
      toast.error("An error occurred");
    }
  };
  //   try {
  //     if (!isLoggedIn) {
  //       // Guest: store in localStorage
  //       let guestCart = JSON.parse(localStorage.getItem("guestCart")) || []; // Check BEFORE adding
  //       const guestExistCart = guestCart.find(
  //         (item) => item._id === product._id || item.id === product.id
  //       );

  //       if (guestExistCart) {
  //         toast.success("Item already in cart!");
  //         return;
  //       }

  //       guestCart.push(product); // Now it's safe to add
  //       localStorage.setItem("guestCart", JSON.stringify(guestCart));
  //       toast.success("Added to cart!");
  //       setCart(guestCart);
  //     }

  //     const response = await fetch(
  //       `${process.env.REACT_APP_API_BASE_URL}/api/productcart/addcart`,
  //       {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({
  //           productId: product._id,
  //         }),
  //         credentials: "include",
  //       }
  //     );
  //     const data = await response.json();
  //     if (!response.ok) {
  //       // toast.error(data.message || "Failed to add to cart");
  //       return;
  //     } // Only update state if the request was successful
  //     setCart((prevCart) => {
  //       const exists = prevCart.find((item) => item._id === product._id);
  //       if (exists) {
  //         toast.success(data.message);
  //         return prevCart;
  //       } else {
  //         toast.success(data.message);
  //         return [...prevCart, product];
  //       }
  //     });
  //   } catch (error) {
  //     console.error("Error adding to cart:", error);
  //     toast.error(error.message);
  //   }
  // };

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
          toast(data.message);
          setClicked(true);
          return prevWishlist.filter((item) => item._id !== product._id);
        } else {
          toast.success(data.message);
          setClicked(true);
          return [...prevWishlist, product];
        }
      });
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      toast.error("Failed to add to wishlist");
    }
  };

  const handleRemoveWishlist = async (productId) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/api/wishlistproduct/removewishlist/${productId}`,
        {
          method: "DELETE",
          credentials: "include", // Include cookies for authentication
        }
      );
      const data = await response.json();
      if (!response.ok) {
        toast.error(data.message || "Failed to remove item from wishlist");
      } else {
        const updatedWishlist = wishlist.filter(
          (item) => item._id !== productId
        );

        setWishlist(updatedWishlist);
        setClicked(false);
        toast.success("Item removed from wishlist");
      }
    } catch (error) {
      toast.error("Failed to remove item from wishlist");
    }
  };

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Navbar
          setQuery={setQuery}
          handleUserLogout={handleUserLogout}
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
                handleRemoveWishlist={handleRemoveWishlist}
                setClicked={setClicked}
                clicked={clicked}
                query={query}
              />
            }
          />

          <Route path="/AboutUs" element={<AboutUs />} />

          <Route path="/ContactUs" element={<ContactUs />} />

          <Route
            path="/LoginSignup"
            element={<LogInSignUp setName={setName} />}
          />

          <Route
            path="/category/:categorySlug"
            element={
              <Men
                handleWishList={handleWishList}
                query={query}
              />
            }
          />

          <Route
            path="/Cart"
            element={
              <Cart
                handleWishList={handleWishList}
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
                handleRemoveWishlist={handleRemoveWishlist}
              />
            }
          />

          <Route
            path="/SingleProduct/:id"
            element={
              <SingleProduct
                setClicked={setClicked}
                clicked={clicked}
                handleWishList={handleWishList}
                handleRemoveWishlist={handleRemoveWishlist}
              />
            }
          />

          <Route
            path="/Profile"
            element={
              <Profile
                name={name}
                handleUserLogout={handleUserLogout}
              />
            }
          />

          <Route
            path="/MyOrders"
            element={
              <MyOrders
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
    </>
  );
}

export default App;
