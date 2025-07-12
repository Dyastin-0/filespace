import { lazy, Suspense, useState } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

const Signin = lazy(() => import("./pages/Signin"));
const Signup = lazy(() => import("./pages/Signup"));
const Verify = lazy(() => import("./pages/Verify"));
const Verification = lazy(() => import("./pages/Verification"));
const Home = lazy(() => import("./pages/Home"));
const Recovery = lazy(() => import("./pages/Recovery"));
const Recover = lazy(() => import("./pages/Recover"));

axios.defaults.baseURL = import.meta.env.VITE_BASE_API_URL;
axios.defaults.withCredentials = true;

console.log(import.meta.env.VITE_BASE_API_URL);

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
          <Route path="/auth/recovery" element={<Recovery />} />
          <Route path="/auth/recover" element={<Recover />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/home" element={<Home />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
