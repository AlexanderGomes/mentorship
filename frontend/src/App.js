import React from "react";
import { Routes, Route } from "react-router-dom";
import { Register, Login, Welcome, Profile, Search } from "./pages";
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
            <Route path="/profile/:userId" element={<Profile />} />
            <Route path="/search" element={<Search />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
