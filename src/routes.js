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
import Student from "./views/CollabLearning/Student.js";
import Group from "./views/CollabLearning/Group.js";
import Staff from "./views/CollabLearning/Staff.js";
import Departmentt from "./views/Departmentt.js";
import Course from "./views/Course/Course.js";
import Orari from "views/Orari.js";
import Hall from "views/Hall/Hall.js";
import Location from "./views/Location/Location.js";
import Team from "views/Mbrojtje/Team.js";
import Player from "views/Mbrojtje/Player.js";


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
    path: "/student",
    name: "Student",
    icon: "nc-icon nc-single-02",
    component: <Student/>,
    layout: "/admin",
    sidebarVisible: true,
  },
  {
    path: "/group",
    name: "Group",
    icon: "nc-icon nc-single-02",
    component: <Group/>,
    layout: "/admin",
    sidebarVisible: true,
  },
  {
    path: "/staff",
    name: "Staff",
    icon: "nc-icon nc-single-02",
    component: <Staff/>,
    layout: "/admin",
    sidebarVisible: true,
  },
  {
    path: "/departmentt",
    name: "Department",
    icon: "nc-icon nc-bank",
    component: <Departmentt/>,
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
    path: "/team",
    name: "Team",
    icon: "nc-icon nc-bank",
    component: <Team/>,
    layout: "/admin",
    sidebarVisible: true,
  },
  {
    path: "/player",
    name: "Player",
    icon: "nc-icon nc-bank",
    component: <Player/>,
    layout: "/admin",
    sidebarVisible: true,
  },
  {
    path: "/orari",
    name: "Schedule",
    icon: "nc-icon nc-time-alarm",
    component: <Orari/>,
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
