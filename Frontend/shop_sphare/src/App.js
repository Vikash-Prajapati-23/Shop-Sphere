import React from "react";
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

function App() {
  return (
    <>
      <Router>
        <Navbar />
        {/* <ContactUs /> */}
        {/* <Home /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/AboutUs" element={<AboutUs />} />
          <Route path="/LoginSignup" element={<LogInSignUp />} />
          <Route path="/Men" element={<Men />} />
          <Route path="/Kid" element={<Kid />} />
          <Route path="/Women" element={<Women />} />
          {/* <Route path="/Home" element={<Home />} /> */}
          {/* <Route path="/signup" element={<LogInSignUp />} /> */}
          {/* You can add more routes here */}
        </Routes>
        {/* <LogInSignUp /> */}
        {/* <SignUp /> */}
        <Footer />
      </Router>
    </>
  );
}

export default App;
