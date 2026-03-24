"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_router_dom_1 = require("react-router-dom");
var Sidebar_1 = require("./Sidebar");
var Topbar_1 = require("./Topbar");
require("../style/dashboard.css");
function DashboardLayout() {
    return (<div className="main-section">
        <Topbar_1.default />
        <div className="dashboard-container">
          <Sidebar_1.default />
          <div className="content-area">
            <react_router_dom_1.Outlet />
          </div>
        </div>
      </div>);
}
exports.default = DashboardLayout;
