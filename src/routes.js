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
import Dashboard from "./views/Dashboard.js";
import Course from "./views/Course/Course.js";
import Hall from "views/Hall/Hall.js";
import Location from "./views/Location/Location.js";



var routes = [
  //{ path: "/path-for-component", 
  //  name: "ComponentName", 
  //  icon: "iconClassName", 
  //  component: <Sidebar/>, 
  //  layout: "/layouts" },
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-shop", //nc-support-17
    component: <Dashboard/>,
    layout: "/admin",
    sidebarVisible: true,
  },
  {
    path: "/course",
    name: "Course",
    icon: "nc-icon nc-paper",
    component: <Course/>,
    layout: "/admin",
    sidebarVisible: true,
  },
  {
    path: "/location",
    name: "Location",
    icon: "nc-icon nc-globe",
    component: <Location/>,
    layout: "/admin",
    sidebarVisible: true,
  },
  {
    path: "/hall",
    name: "Hall",
    icon: "nc-icon nc-button-pause",
    component: <Hall/>,
    layout: "/admin",
    sidebarVisible: true,
  },
];
export default routes;
