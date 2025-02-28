import React from "react";
import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div className="auth-layout">
      {/* Shto një wrapper ose stilim për Login/Register */}
      <div className="auth-content">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;