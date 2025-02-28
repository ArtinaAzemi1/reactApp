import React from 'react';
import { NavLink } from 'react-router-dom';

function SidebarAdmin() {
  return (
    <div className="sidebar">
      <ul>
        <li><NavLink to="/admin/dashboard">Dashboard</NavLink></li>
        <li><NavLink to="/admin/users">User Management</NavLink></li>
        {/* Add more admin links */}
      </ul>
    </div>
  );
}

export default SidebarAdmin;