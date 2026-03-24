import { NavLink } from "react-router-dom";
import "../style/dashboard.css";

function Sidebar() {
  return (
    <div className="sidebar">
      <nav>
        <NavLink to="/admin/dashboard">Dashboard</NavLink>
        <NavLink to="/admin/meetings">Meetings</NavLink>
        <NavLink to="/admin/staff">Staff Management</NavLink>
        <NavLink to="/admin/department">Department</NavLink>
        <NavLink to="/admin/settings">Settings</NavLink>
      </nav>

      <button
        className="logout-button"
        onClick={() => {
          localStorage.removeItem("token");
          localStorage.removeItem("isLoggedIn");
          window.location.href = "/login";
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default Sidebar;
