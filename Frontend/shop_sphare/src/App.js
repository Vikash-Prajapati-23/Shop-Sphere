import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
// import Error from './components/Error';
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import Men from "./components/Men/Men";
import Kid from "./components/Kid/Kid";
import Women from "./components/Women/Women";
// import ContactUs from "./components/ContactUs/ContactUs";
import AboutUs from "./components/AboutUs/AboutUs";
import LogInSignUp from "./components/LogInSignUp/LogInSignUp";
import Electronics from "./components/Electronics/Electronics";
import Jewelery from "./components/Jewelery/Jewelery";
import Alert from "./components/Alert/Alert";
import SingleProduct from "./components/SingleProduct/SingleProduct";

function App({handleCardClick}) {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      message: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };

  return (
    <>
      <Router>
        <Navbar />
        {/* <ContactUs /> */}
        {/* <Home /> */}
        <Alert alert={alert} />
        <Routes>
          <Route path="/" element={<Home showAlert={showAlert} />} />
          <Route path="/AboutUs" element={<AboutUs />} />
          <Route path="/LoginSignup" element={<LogInSignUp />} />
          <Route path="/Men" element={<Men showAlert={showAlert} />} />
          <Route path="/Kid" element={<Kid showAlert={showAlert} />} />
          <Route path="/Women" element={<Women showAlert={showAlert} />} />
          <Route
            path="/Electronics"
            element={<Electronics showAlert={showAlert} />}
          />
          <Route
            path="/Jewelery"
            element={<Jewelery showAlert={showAlert} />}
          />
          <Route path="/SingleProduct/:id" element={<SingleProduct showAlert={showAlert} />} />
        </Routes>
        {/* <LogInSignUp /> */}
        {/* <SignUp /> */}
        <Footer />
      </Router>
    </>
  );
}

export default App;
