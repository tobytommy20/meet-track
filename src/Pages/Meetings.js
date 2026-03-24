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
require("../style/meetings.css");
var react_router_dom_1 = require("react-router-dom");
var react_1 = require("react");
var SearchInput_1 = require("../components/SearchInput");
var fi_1 = require("react-icons/fi");
var Pagination_1 = require("../components/Pagination");
var react_2 = require("react");
function Meetings() {
    var _this = this;
    var navigate = (0, react_router_dom_1.useNavigate)();
    var _a = (0, react_1.useState)([]), meetings = _a[0], setMeetings = _a[1];
    var _b = (0, react_1.useState)(""), search = _b[0], setSearch = _b[1];
    var _c = (0, react_1.useState)(1), page = _c[0], setPage = _c[1];
    var _d = (0, react_1.useState)(2), totalPages = _d[0], setTotalPages = _d[1];
    var _e = (0, react_1.useState)(null), openMenuId = _e[0], setOpenMenuId = _e[1];
    var _f = (0, react_1.useState)(null), zoomStartMeetingUrl = _f[0], setZoomStartMeetingUrl = _f[1];
    var menuRef = (0, react_2.useRef)(null);
    var PageSize = 8;
    (0, react_1.useEffect)(function () {
        var handleClickOutside = function (event) {
            if (menuRef.current &&
                !menuRef.current.contains(event.target)) {
                setOpenMenuId(null);
            }
        };
        document.addEventListener("click", handleClickOutside);
        return function () {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);
    (0, react_1.useEffect)(function () {
        fetchMeetings(page, PageSize);
    }, [page, search]);
    var fetchMeetings = function (pageNumber, size) { return __awaiter(_this, void 0, void 0, function () {
        var res, data, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch("http://207.180.246.69:7200/api/v1/meetings?page=".concat(pageNumber, "&limit=").concat(size, "&search=").concat(search, "&"), {
                            headers: {
                                Authorization: "Bearer ".concat(localStorage.getItem("token")),
                            },
                        })];
                case 1:
                    res = _a.sent();
                    return [4 /*yield*/, res.json()];
                case 2:
                    data = _a.sent();
                    if (!res.ok)
                        throw new Error(data.message);
                    setMeetings(data.data.data || []);
                    setTotalPages(data.data.totalPages);
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _a.sent();
                    console.error("Failed to fetch meetings", err_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var deleteMeeting = function (id) { return __awaiter(_this, void 0, void 0, function () {
        var err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!window.confirm("Delete this meeting?"))
                        return [2 /*return*/];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, fetch("http://207.180.246.69:7200/api/v1/meetings?id=".concat(id), {
                            method: "DELETE",
                            headers: {
                                Authorization: "Bearer ".concat(localStorage.getItem("token")),
                            },
                        })];
                case 2:
                    _a.sent();
                    fetchMeetings(page, PageSize);
                    return [3 /*break*/, 4];
                case 3:
                    err_2 = _a.sent();
                    console.error("Delete failed", err_2);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var handleStartMeeting = function (url) {
        if (!url) {
            alert("Meeting start link not available");
            return;
        }
        setZoomStartMeetingUrl(url);
        setOpenMenuId(null);
    };
    var getMeetingStatus = function (startDatetime, durationMinutes) {
        var start = new Date(startDatetime).getTime();
        var end = start + durationMinutes * 60000;
        var now = Date.now();
        if (now < start)
            return "scheduled";
        if (now >= start && now <= end)
            return "live";
        return "ended";
    };
    var _g = (0, react_1.useState)(0), forceUpdate = _g[1];
    (0, react_1.useEffect)(function () {
        var timer = setInterval(function () {
            forceUpdate(function (n) { return n + 1; });
        }, 60000);
        return function () { return clearInterval(timer); };
    }, []);
    return (<div className="table-page">
      <div className="page-header">
        <h2>Meetings</h2>

        <div className="table-filters">
          <SearchInput_1.default value={search} onChange={setSearch} placeholder="Search meeting"/>

          <button className="primary-btn" onClick={function () { return navigate("/admin/create-meeting"); }}>
            + Create</button>
        </div>
      </div>

      <div className="table-card">
        <table>
          <thead>
            <tr>
              <th className="id-header">ID</th>
              <th>Title</th>
              <th>Start Time</th>
              <th>Mode</th>
              <th>Audience</th>
              <th>Status</th>
              <th>Start Meeting</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {meetings.map(function (meeting) { return (<tr key={meeting.id}>
                <td className="id">{meeting.id}</td>
                <td className="name">{meeting.title}</td>
                <td className="date">
                  {new Date(meeting.startDatetime).toLocaleString()}
                </td>
                <td>{meeting.mode}</td>
                <td>{meeting.audienceType.replace("_", " ")}</td>
                <td>
                  {(function () {
                var status = getMeetingStatus(meeting.startDatetime, meeting.durationMinutes);
                return (<span className={"status-badge ".concat(status)}>
                          {status}
                          </span>);
            })()}
                
                </td>
                <td>
                  
                  <button className="start-meeting-btn" disabled={getMeetingStatus(meeting.startDatetime, meeting.durationMinutes) === "ended"} onClick={function () { return handleStartMeeting(meeting.zoomStartUrl); }}>
                    Start
                   </button>

                   </td> 
        
                <td className="action-cell">
                  <button className="menu-btn" onClick={function (e) {
                e.stopPropagation();
                setOpenMenuId(openMenuId === meeting.id ? null : meeting.id);
            }}>
                    <fi_1.FiMoreVertical />
                  </button>
                  {openMenuId === meeting.id && (<div className="action-menu" ref={menuRef}>
                      <button onClick={function () { return console.log("view", meeting.id); }}>
                        <fi_1.FiEye className="menu-icon"/>
                        View
                      </button>

                      <button>
                        <fi_1.FiEdit className="menu-icon"/> 
                        Edit
                      </button>

                      <button className="delete-button" onClick={function () { return deleteMeeting(meeting.id); }}>
                        <fi_1.FiTrash2 className="menu-icon delete"/>
                        Delete
                      </button>
                    </div>)}
                </td>

                    
              </tr>); })}

            {meetings.length === 0 && (<tr>
                <td colSpan={7}>No meetings found</td>
              </tr>)}
          </tbody>
        </table>

            {zoomStartMeetingUrl && (<div className="modal-overlay">

    <div className="modal">

      <h3>Start Meeting</h3>

      <p>
        Are you sure you want to start this meeting now?
      </p>

      <div className="modal-actions">

        <button className="secondary-btn" onClick={function () { return setZoomStartMeetingUrl(null); }}>
          Cancel
        </button>

        <button className="primary-btn" onClick={function () {
                window.open(zoomStartMeetingUrl, "_blank");
                setZoomStartMeetingUrl(null);
            }}>
          Start Meeting
        </button>

      </div>

    </div>

  </div>)}


      </div>

      <Pagination_1.default page={page} totalPages={totalPages} setPage={setPage}/>
    </div>);
}
exports.default = Meetings;
