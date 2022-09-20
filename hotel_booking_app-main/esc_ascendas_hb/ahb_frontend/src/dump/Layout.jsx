import React from "react";
import { BrowserRouter, Route, Link, Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <h1>
        <Link to="/Map">Map</Link>
      </h1>
      <Outlet />
    </>
  );
};

export default Layout;
