import React from 'react';
import Sidebar from './Sidebar'; // Nhập Sidebar
import './Admin.css'; // Nhập CSS cho Admin

function Admin() {
  return (
    <div className="admin-container">
      <Sidebar />
      <div className="content">
        <h1>Dashboard</h1>
        <p>Welcome to the Admin Dashboard</p>
        {/* Nội dung chính khác */}
      </div>
    </div>
  );
}

export default Admin;
