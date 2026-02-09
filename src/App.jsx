import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/home.jsx";
import Login from "./Pages/Login/login.jsx";
import Navbar from "./Components/Navbar/navbar.jsx";
import Signup from "./Pages/SignUp/signup.jsx";
import About from "./Pages/About/About.jsx";
import ContactUs from "./Pages/ContactUS/ContactUs.jsx";
import HotelListing from "./Pages/Hotels/HotelListing.jsx";
import Shimla from "./Pages/Shimla/Shimla.jsx";
import Packagess from"./Pages/Packages/Packages.jsx";
import ScrollToTop from "./Components/ScrollToTop";





export default function App() {
  return (
    <>
      <Navbar />   {/* Always visible */}
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/About" element={<About/>}/>
        <Route path="/ContactUs" element={<ContactUs/>}/>
        <Route path="/Hotel" element={<HotelListing/>}/>
        <Route path="/shimla" element={<Shimla/>}/>
        <Route path="/packagess" element={<Packagess/>}/>

        
      </Routes>
    </>
  );
}
