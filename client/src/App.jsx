import { lazy, Suspense, useState } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";

const Signin = lazy(() => import("./pages/Signin"));
const Signup = lazy(() => import("./pages/Signup"));
const Verify = lazy(() => import("./pages/Verify"));
const Verification = lazy(() => import("./pages/Verification"));

axios.defaults.baseURL = import.meta.env.VITE_BASE_API_URL;
axios.defaults.withCredentials = true;

const App = () => {
  return (
    <Routes>
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/auth/verification" element={<Verification />} />
      <Route path="/auth/verify" element={<Verify />} />
    </Routes>
  );
};

export default App;
