/*!

=========================================================
* Paper Dashboard React - v1.3.2
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import DashboardProfessor from "./views/DashboardProfessor.js";
import Tables from "./views/Tables.js";
import UserPage from "./views/User.js";
import Map from "./views/Map.js";
import Icons from "./views/Icons.js";
import Notifications from "./views/Notifications.js";

import Professor from "./views/Professor.js";
import Department from "./views/Department.js";
import Course from "./views/Course/Course.js";

//import Login from "./Login.js";
import Sidebar from "./components/Sidebar/Sidebar.js";
import ViewStudent from "views/ViewStudent.js";
import ViewStudent2 from "views/ViewStudent2.js";
import Login from './layouts/Login.js'; 
import Register from './layouts/Register.js'; 

var routes = [
  //{ path: "/path-for-component", 
  //  name: "ComponentName", 
  //  icon: "iconClassName", 
  //  component: <Sidebar/>, 
  //  layout: "/layouts" },
  {
    path: "/dashboardProfessor",
    name: "Dashboard",
    icon: "nc-icon nc-shop", //nc-support-17
    component: <DashboardProfessor/>,
    layout: "/admin",
  },
  {
    path: "/department",
    name: "Department",
    icon: "nc-icon nc-bank",
    component: <Department/>,
    layout: "/admin",
  },
  {
    path: "/course",
    name: "Course",
    icon: "nc-icon nc-paper",
    component: <Course/>,
    layout: "/admin",
  },
  {
    path: "/user-page",
    name: "UserPage",
    icon: "nc-icon nc-hat-3",
    component: <UserPage/>,
    layout: "/admin",
  },
  {
    path: "/icons",
    name: "Icon",
    icon: "nc-icon nc-hat-3",
    component: <Icons/>,
    layout: "/admin",
  },
  {
    path: "/login",
    name: "Login",
    icon: "nc-icon nc-hat-3",
    component: <Login/>,
    layout: "/login",
  },
  {
    path: "/register",
    name: "Register",
    icon: "nc-icon nc-hat-3",
    component: <Register/>,
    layout: "/register",
  },
  {
    path: "/viewStudent",
    name: "View Student",
    icon: "nc-icon nc-hat-3",
    component: <ViewStudent/>,
    layout: "/auth",
  },
  {
    path: "/viewStudent2",
    name: "View Student 2",
    icon: "nc-icon nc-hat-3",
    component: <ViewStudent2/>,
    layout: "/admin",
  },
];
export default routes;
