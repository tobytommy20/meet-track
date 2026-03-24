import "../style/dashboard.css"
import logo from "../style/logo.png";


function Topbar() {
    return (
      <div className="topbar">
        <div
        className="logo">
          <img src={logo} alt="" />
        </div>
        <span> HR Admin</span>
      </div>
    );
}

export default Topbar;