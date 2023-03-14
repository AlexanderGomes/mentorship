import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Register, Login, Dash } from "./pages";
import { useDispatch } from "react-redux";
import axios from "axios";
import "./App.css";

function App() {
  const refresh = async () => {
    const response = await axios.get("/api/user/refresh-token", {
      withCredentials: true,
    });
    console.log(response);
  };

  useEffect(() => {
    refresh();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/auth/register" element={<Register />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/dash" element={<Dash />} />
      </Routes>
    </Router>
  );
}

export default App;
