import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import CreateMeeting from "./Pages/CreateMeeting";
import Login from "./Pages/Login";
import DashboardLayout from "./Layout/Layout";
import Meetings from "./Pages/Meetings";
import Settings from "./Pages/Settings";
import Staff from "./Pages/Staff";
import Department from "./Pages/Department";
import Dashboard from "./Pages/Dashboard"
import AttendanceConfirm from "./Pages/AttendanceConfirm"

/*import JoinMeeting from "./JoinMeeting";
import MeetingDetail from "./MeetingDetail";
import PrivateRoute from "./PrivateRoute";*/

function App() {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/attendance/confirm" element={<AttendanceConfirm />} />


        <Route
          path="/admin"
          element={isLoggedIn ? <DashboardLayout /> : <Navigate to="/login" />}
        > 
          <Route index element={<Navigate to="dashboard" />} /> 

          <Route path="dashboard" element={<Dashboard />} />
          <Route path="create-meeting" element={<CreateMeeting />} />
          <Route path="meetings" element={<Meetings />} />
          <Route path="settings" element={<Settings />} />
          <Route path="staff" element={<Staff />} />
          <Route path="department" element={<Department />} />
          </Route>

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
