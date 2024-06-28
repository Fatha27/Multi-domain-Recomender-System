


import React, { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./Navbar";
import LoginPage from "./Authentication/LoginPage";
import Signup from "./Authentication/Signup";
import Home from "./Home";
import Recommenders from "./Recommenders";
import Faq from "./Faq";
import RecommendationPage from "./RecommendationPage";
import Footer from "./Footer";


function App() {
  const [token, setToken] = useState(document.cookie.includes('token'));
  const [gClick,setGClick]=useState(false)
  function googleClicked(){
    setGClick(true)
  }
  console.log(gClick)

  return (
    <div className="">
      <Navbar token={token} setToken={setToken} click={gClick} />
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/recommenders"
          element={token ? <Recommenders /> : <Navigate to="/login" />}
        />
         <Route
          path="/recommenders/:id"
          element={token ? <RecommendationPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/faq"
          element={token ? <Faq /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={token ? <Navigate to="/" /> : <LoginPage setToken={setToken} googleClick={googleClicked}/>}
        />
        <Route
          path="/signup"
          element={token ? <Navigate to="/" /> : <Signup />}
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
