import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Register, Login, Dash } from "./pages";
import PersistentLogin from "./hooks/PersistentLogin";
import Auth from "./hooks/Auth";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/auth/register" element={<Register />} />
      <Route path="/auth/login" element={<Login />} />

      <Route element={<PersistentLogin />}>
        <Route element={<Auth />}>
          <Route path="/dash" element={<Dash />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
