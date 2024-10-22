import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
// import Error from './components/Error';
import Footer from "./components/Footer/Footer";
import ContactUs from "./components/ContactUs/ContactUs";
import AboutUs from "./components/AboutUs/AboutUs";
import LogInSignUp from "./components/LogInSignUp/LogInSignUp";
import SignUp from "./components/SignUp/SignUp";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        {/* <ContactUs /> */}
        {/* <AboutUs /> */}
        <Routes>
          <Route path="/auth" element={<LogInSignUp />} />
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
