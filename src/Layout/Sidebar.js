"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_router_dom_1 = require("react-router-dom");
require("../style/dashboard.css");
function Sidebar() {
    return (<div className="sidebar">
      <nav>
        <react_router_dom_1.NavLink to="/admin/dashboard">Dashboard</react_router_dom_1.NavLink>
        <react_router_dom_1.NavLink to="/admin/meetings">Meetings</react_router_dom_1.NavLink>
        <react_router_dom_1.NavLink to="/admin/staff">Staff Management</react_router_dom_1.NavLink>
        <react_router_dom_1.NavLink to="/admin/department">Department</react_router_dom_1.NavLink>
        <react_router_dom_1.NavLink to="/admin/settings">Settings</react_router_dom_1.NavLink>
      </nav>

      <button className="logout-button" onClick={function () {
            localStorage.removeItem("token");
            localStorage.removeItem("isLoggedIn");
            window.location.href = "/login";
        }}>
        Logout
      </button>
    </div>);
}
exports.default = Sidebar;
