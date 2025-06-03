import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const Layout = () => (
  <div className="d-flex">
    <Sidebar />
    <div className="flex-grow-1 p-4">
      <Outlet />
    </div>
  </div>
);

export default Layout;
