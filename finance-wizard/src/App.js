import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashbord";
import Signup from "./pages/SignUp";
import Header from "./components/Header";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Header />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/dashbord" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;
