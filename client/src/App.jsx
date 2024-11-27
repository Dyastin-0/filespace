import { lazy, Suspense, useState } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import Navbar from "./components/Navbar";

const Signin = lazy(() => import("./pages/Signin"));
const Signup = lazy(() => import("./pages/Signup"));
const Verify = lazy(() => import("./pages/Verify"));
const Verification = lazy(() => import("./pages/Verification"));
const Home = lazy(() => import("./pages/Home"));

axios.defaults.baseURL = import.meta.env.VITE_BASE_API_URL;
axios.defaults.withCredentials = true;

const App = () => {
  return (
    <>
      <Navbar />
      <Suspense>
        <Routes>
          <Route path="/sign-in" element={<Signin />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/auth/verification" element={<Verification />} />
          <Route path="/auth/verify" element={<Verify />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
