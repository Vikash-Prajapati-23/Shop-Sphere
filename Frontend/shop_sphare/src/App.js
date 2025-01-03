import React, { createContext, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
// import Error from './components/Error';
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import Men from "./components/Men/Men";
import Kid from "./components/Kid/Kid";
import Women from "./components/Women/Women";
import ContactUs from "./components/ContactUs/ContactUs";
import AboutUs from "./components/AboutUs/AboutUs";
import LogInSignUp from "./components/LogInSignUp/LogInSignUp";
import Electronics from "./components/Electronics/Electronics";
import Jewelery from "./components/Jewelery/Jewelery";
import Alert from "./components/Alert/Alert";
import SingleProduct from "./components/SingleProduct/SingleProduct";

// Creating context 
const alertContext = createContext();
const themeContext = createContext();

function App() {
  const [alert, setAlert] = useState(null);
  const [mode, setMode] = useState(false);

  const toggleTheme = () => {
    let sun = document.querySelector(".sun");
    let moon = document.querySelector(".moon");
    if (mode === false) {
      setMode(true);
      moon.classList.remove('hide');
      sun.classList.add('hide');
      document.body.style.backgroundColor = '#121212';
      document.body.style.color = '#333333';
      showAlert("Switch to Dark mode.", "green")
    }
    else {
      setMode(false);
      sun.classList.remove('hide');
      moon.classList.add('hide');
      document.body.style.backgroundColor = '#EAECED';
      document.body.style.color = '#fff';
      showAlert("Switch to Light mode.", "blue")
    }
  }

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
        <themeContext.Provider value={{ mode, toggleTheme }} >
          <Navbar />
          <alertContext.Provider value={{ alert, showAlert }}>  {/* Using provider to provide the value. */}
            <Alert />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/AboutUs" element={<AboutUs />} />
              <Route path="/ContactUs" element={<ContactUs />} />
              <Route path="/LoginSignup" element={<LogInSignUp />} />
              <Route path="/Men" element={<Men />} />
              <Route path="/Kid" element={<Kid />} />
              <Route path="/Women" element={<Women />} />
              <Route path="/Electronics" element={<Electronics />} />
              <Route path="/Jewelery" element={<Jewelery />} />
              <Route path="/SingleProduct/:id" element={<SingleProduct />} />
            </Routes>
          </alertContext.Provider>
          <Footer />
        </themeContext.Provider>
      </Router>
    </>
  );
}

export default App;
export { alertContext }
export { themeContext }