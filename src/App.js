import logo from './logo.svg';
import './index.js'
import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';


/*function App() {

  const isAuthenticated = !!localStorage.getItem("authToken");

  return (
    <BrowserRouter>
      <div className="App">
        <div className="main-content">
          <Routes>
          <Route path="/login" element={<Login />} />
          <Route
          path="/admin/*"
          element={isAuthenticated ? <Admin /> : <Navigate to="/login" replace />}
        />
        <Route path="*" element={<Navigate to="/login" replace />} />
            {routes.map((prop, key) => {
              return (
                <Route
                  path={prop.layout + prop.path}
                  element={prop.component}
                  key={key}
                />
              );
            })}
            {routesP.map((prop, key) => {
              return (
                <Route
                  path={prop.layout + prop.path}
                  element={prop.component}
                  key={key}
                />
              );
            })}
            {routesSt.map((prop, key) => {
              return (
                <Route
                  path={prop.layout + prop.path}
                  element={prop.component}
                  key={key}
                />
              );
            })}
            <Route path="/viewStudent" component={ViewStudent} />
            <Route path="/" element={<Navigate to="/admin/dashboard" />} /> 
            <Route path="/" element={<Navigate to="/professor/dashboardProfessor" />} /> 
            <Route path="/" element={<Navigate to="/student/dashboardStudent" />} /> 
            <Route path="/" element={<Navigate to="/auth/login" />} />
            
         {}
            <Navigate from="/" to="/login" />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;*/

import Admin from "./layouts/Admin";
  import AdminLayout from "./layouts/Admin";
  import AuthLayout from "./layouts/Auth";
  
  function App() {
    const isAuthenticated = !!localStorage.getItem("authToken");
  
    return (
      <BrowserRouter>
        <Routes>
          {/* Rrugët për Admin */}
          <Route
            path="/admin/*"
            element={isAuthenticated ? <AdminLayout /> : <Navigate to="/auth/login" replace />}
          />
          {/* Rrugët për Auth */}
          <Route path="/auth/*" element={<AuthLayout />} />
          {/* Rruga Default */}
          <Route path="*" element={<Navigate to="/auth/login" replace />} />
        </Routes>
      </BrowserRouter>
    );
  }
  
  export default App;
