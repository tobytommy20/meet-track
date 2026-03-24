import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import "../style/dashboard.css"


function DashboardLayout() {
    return (
      <div className="main-section">
        <Topbar />
        <div className="dashboard-container">
          <Sidebar />
          <div className="content-area">
            <Outlet />
          </div>
        </div>
      </div>
    );
}


export default DashboardLayout;