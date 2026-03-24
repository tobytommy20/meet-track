"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_router_dom_1 = require("react-router-dom");
var react_1 = require("react");
require("../style/attendance.css");
function AttendanceConfirm() {
    var _this = this;
    var _a = (0, react_1.useState)(false), loading = _a[0], setLoading = _a[1];
    var _b = (0, react_1.useState)(""), status = _b[0], setStatus = _b[1];
    var searchParams = (0, react_router_dom_1.useSearchParams)()[0];
    var token = searchParams.get("token");
    console.log("Token:", token);
    var confirmAttendance = function () {
        if (!token) {
            alert("Invalid attendance link");
            return;
        }
        if (!navigator.geolocation) {
            alert("Geolocation not supported");
            return;
        }
        setLoading(true);
        navigator.geolocation.getCurrentPosition(function (position) { return __awaiter(_this, void 0, void 0, function () {
            var latitude, longitude, res, data, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        latitude = position.coords.latitude;
                        longitude = position.coords.longitude;
                        console.log("Sending attendance confirmation:", {
                            token: token,
                            latitude: latitude,
                            longitude: longitude
                        });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, fetch("http://207.180.246.69:7200/api/v1/meeting-invites/attendance/confirm", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify({
                                    token: token,
                                    latitude: latitude,
                                    longitude: longitude
                                })
                            })];
                    case 2:
                        res = _a.sent();
                        return [4 /*yield*/, res.json()];
                    case 3:
                        data = _a.sent();
                        if (!res.ok) {
                            throw new Error(data.message || "Request failed");
                        }
                        if (data.isSuccessful) {
                            setStatus("success");
                        }
                        else {
                            setStatus("failed");
                        }
                        return [3 /*break*/, 5];
                    case 4:
                        err_1 = _a.sent();
                        console.error(err_1);
                        alert(err_1.message || "Something went wrong");
                        setStatus("failed");
                        return [3 /*break*/, 5];
                    case 5:
                        setLoading(false);
                        return [2 /*return*/];
                }
            });
        }); }, function () {
            alert("Location permission required");
            setLoading(false);
        });
    };
    return (<div className="attendance-page">

            <div className="attendance-card">


      <h2>Meeting Attendance</h2>

      {status === "" && (<>
        <p>
            Click the button below to confirm your attendance at this meeting.
        </p>

        {loading && <p> Getting your location</p>}
      <button className="confirm-btn" onClick={confirmAttendance} disabled={loading || status === "success"}>
        {loading ? "Confirming..." : "Confirm Attendance"}
      </button>
      </>)}

      {status === "success" && (<div className="success-msg">
         Attendance Confirmed
        </div>)}


       {status === "error" && (<div className="error-msg">
             Attendance could not be confirmed
        </div>)}


     </div>

    </div>);
}
exports.default = AttendanceConfirm;
