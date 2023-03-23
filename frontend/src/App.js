import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { Register, Login, Dash, Welcome, Profile } from "./pages";
import PersistentLogin from "./hooks/PersistentLogin";
import Auth from "./hooks/Auth";
import Layout from "./components/Layout";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/auth/register" element={<Register />} />
      <Route path="/auth/login" element={<Login />} />

      <Route element={<Layout />}>
        <Route path="/" element={<Welcome />} />
        <Route element={<PersistentLogin />}>
          <Route element={<Auth />}>
            <Route path="/dash" element={<Dash />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
