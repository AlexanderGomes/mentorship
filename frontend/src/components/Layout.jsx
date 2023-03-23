import React from "react";
import { Outlet } from "react-router-dom";
import { Footer, Navbar } from "./";

const Layout = () => {
  return (
    <div className="layout__main">
      <Navbar />
      <main className="layout__content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
