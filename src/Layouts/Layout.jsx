import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

const Layout = () => {
  return (
    <div className="bg-gradient text-white min-h-screen poppins-regular">
      <div className="container px-6 py-4 mx-auto">
      <Header/>
        <main>
          <Outlet />
        </main>
        <Footer/>
      </div>
    </div>
  );
};

export default Layout;
