"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_router_dom_1 = require("react-router-dom");
var CreateMeeting_1 = require("./Pages/CreateMeeting");
var Login_1 = require("./Pages/Login");
var Layout_1 = require("./Layout/Layout");
var Meetings_1 = require("./Pages/Meetings");
var Settings_1 = require("./Pages/Settings");
var Staff_1 = require("./Pages/Staff");
var Department_1 = require("./Pages/Department");
var Dashboard_1 = require("./Pages/Dashboard");
var AttendanceConfirm_1 = require("./Pages/AttendanceConfirm");
/*import JoinMeeting from "./JoinMeeting";
import MeetingDetail from "./MeetingDetail";
import PrivateRoute from "./PrivateRoute";*/
function App() {
    var isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    return (<react_router_dom_1.BrowserRouter>
      <react_router_dom_1.Routes>
        <react_router_dom_1.Route path="/login" element={<Login_1.default />}/>
        <react_router_dom_1.Route path="/attendance/confirm" element={<AttendanceConfirm_1.default />}/>


        <react_router_dom_1.Route path="/admin" element={isLoggedIn ? <Layout_1.default /> : <react_router_dom_1.Navigate to="/login"/>}> 
          <react_router_dom_1.Route index element={<react_router_dom_1.Navigate to="dashboard"/>}/> 

          <react_router_dom_1.Route path="dashboard" element={<Dashboard_1.default />}/>
          <react_router_dom_1.Route path="create-meeting" element={<CreateMeeting_1.default />}/>
          <react_router_dom_1.Route path="meetings" element={<Meetings_1.default />}/>
          <react_router_dom_1.Route path="settings" element={<Settings_1.default />}/>
          <react_router_dom_1.Route path="staff" element={<Staff_1.default />}/>
          <react_router_dom_1.Route path="department" element={<Department_1.default />}/>
          </react_router_dom_1.Route>

        <react_router_dom_1.Route path="*" element={<react_router_dom_1.Navigate to="/login"/>}/>
      </react_router_dom_1.Routes>
    </react_router_dom_1.BrowserRouter>);
}
exports.default = App;
