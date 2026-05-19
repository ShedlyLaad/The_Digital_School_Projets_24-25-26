import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavbarHook from "./NavbarHook/NavbarHook";
import Home from "./pages/Home";
import News from "./pages/News";
import Footer1 from './Footer/Footer.js';


const App = () => {
  return (
    <Router>
       {/* {<Navbar />  } */}
      <NavbarHook />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/news" element={<News />
        
        } />
          {/* Define other routes that you need*/}
        </Routes>
        <Footer1/>
      </main>
    </Router>
  );
};

export default App;
