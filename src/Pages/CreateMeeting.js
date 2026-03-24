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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
require("../style/form.css");
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
function CreateMeeting() {
    var _this = this;
    var navigate = (0, react_router_dom_1.useNavigate)();
    var _a = (0, react_1.useState)(""), mode = _a[0], setMode = _a[1];
    var _b = (0, react_1.useState)(""), title = _b[0], setTitle = _b[1];
    var _c = (0, react_1.useState)(""), audienceType = _c[0], setAudienceType = _c[1];
    var _d = (0, react_1.useState)(""), startDatetime = _d[0], setStartDatetime = _d[1];
    var _e = (0, react_1.useState)(60), durationMinutes = _e[0], setDurationMinutes = _e[1];
    var _f = (0, react_1.useState)(""), location = _f[0], setLocation = _f[1];
    var _g = (0, react_1.useState)([]), departmentIds = _g[0], setDepartmentIds = _g[1];
    var _h = (0, react_1.useState)([]), departments = _h[0], setDepartments = _h[1];
    var _j = (0, react_1.useState)([]), staff = _j[0], setStaff = _j[1];
    var _k = (0, react_1.useState)([]), virtualStaffIds = _k[0], setVirtualStaffIds = _k[1];
    var _l = (0, react_1.useState)(false), loading = _l[0], setLoading = _l[1];
    var _m = (0, react_1.useState)(false), showSuccessModal = _m[0], setShowSuccessModal = _m[1];
    (0, react_1.useEffect)(function () {
        var fetchStaff = function () { return __awaiter(_this, void 0, void 0, function () {
            var res, data, list, err_1;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, fetch("http://207.180.246.69:7200/api/v1/staff", {
                                headers: {
                                    Authorization: "Bearer ".concat(localStorage.getItem("token"))
                                }
                            })];
                    case 1:
                        res = _c.sent();
                        return [4 /*yield*/, res.json()];
                    case 2:
                        data = _c.sent();
                        console.log("STAFF RESPONSE:", data);
                        list = ((_a = data === null || data === void 0 ? void 0 : data.data) === null || _a === void 0 ? void 0 : _a.data) || ((_b = data === null || data === void 0 ? void 0 : data.data) === null || _b === void 0 ? void 0 : _b.items) || (data === null || data === void 0 ? void 0 : data.data) || [];
                        setStaff(Array.isArray(list) ? list : []);
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _c.sent();
                        console.error("Failed to load staff", err_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        fetchStaff();
    }, []);
    (0, react_1.useEffect)(function () {
        var fetchDepartments = function () { return __awaiter(_this, void 0, void 0, function () {
            var res, data, list, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, fetch("http://207.180.246.69:7200/api/v1/departments", {
                                headers: {
                                    Authorization: "Bearer ".concat(localStorage.getItem("token")),
                                },
                            })];
                    case 1:
                        res = _a.sent();
                        return [4 /*yield*/, res.json()];
                    case 2:
                        data = _a.sent();
                        list = data.data || [];
                        setDepartments(list);
                        return [3 /*break*/, 4];
                    case 3:
                        err_2 = _a.sent();
                        console.error("Failed to load departments", err_2);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        fetchDepartments();
    }, []);
    var handleSubmit = function (e) { return __awaiter(_this, void 0, void 0, function () {
        var res, data, errorData, err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    if (loading)
                        return [2 /*return*/];
                    setLoading(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, 7, 8]);
                    return [4 /*yield*/, fetch("http://207.180.246.69:7200/api/v1/meetings", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: "Bearer ".concat(localStorage.getItem("token")),
                            },
                            body: JSON.stringify({
                                title: title,
                                mode: mode,
                                audienceType: audienceType,
                                startDatetime: startDatetime,
                                durationMinutes: durationMinutes,
                                location: location,
                                departmentIds: departmentIds,
                                virtualStaffIds: virtualStaffIds
                            }),
                        })];
                case 2:
                    res = _a.sent();
                    return [4 /*yield*/, res.json()];
                case 3:
                    data = _a.sent();
                    if (!!res.ok) return [3 /*break*/, 5];
                    return [4 /*yield*/, res.json()];
                case 4:
                    errorData = _a.sent();
                    console.log("Audience Type Sent:", audienceType);
                    console.log("SERVER ERROR:", errorData);
                    throw new Error(errorData.message || "Failed");
                case 5:
                    setShowSuccessModal(true);
                    return [3 /*break*/, 8];
                case 6:
                    err_3 = _a.sent();
                    console.error(err_3);
                    return [3 /*break*/, 8];
                case 7:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 8: return [2 /*return*/];
            }
        });
    }); };
    return (<div className="form-page">
      <div className="form-header">
        <button className="back-btn" onClick={function () { return navigate("/admin/meetings"); }}>
          <span className="back">← </span>Back
        </button>

        <h2>Create Meeting</h2>
      </div>

      <div className="form-card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Choose Meeting Type *</label>

            <select value={mode} onChange={function (e) { return setMode(e.target.value); }} required>
              <option value="">Select Meeting Type</option>
              <option value="physical">Physical</option>
              <option value="virtual">Virtual</option>
              <option value="hybrid">Hybrid</option>
            </select>
          </div>

          {mode && (<>
              <div className="form-section">
                <h3 className="section-title">Meeting Information</h3>

                <div className="form-grid">
                  <div>
                    <label>Meeting Title *</label>
                    <input value={title} onChange={function (e) { return setTitle(e.target.value); }} required/>
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h3 className="section-title">Audience</h3>
                <div className="form-grid">
                  <div>
                    <label>Audience Type *</label>
                    <select value={audienceType} onChange={function (e) { return setAudienceType(e.target.value); }} required>
                      <option value=""> Select audience</option>
                      <option value="all_staff"> All Staff</option>
                      <option value="departments"> Departments</option>
                    </select>
                  </div>
                </div>

                {audienceType === "departments" && (<div className="form-group">
                    <label>Select Department(s)</label>

                    <div className="department-chips">
                      {departments.map(function (dept) {
                    var selected = departmentIds.includes(dept.id);
                    return (<div key={dept.id} className={"chip ".concat(selected ? "chip-selected" : "")} onClick={function () {
                            if (selected) {
                                setDepartmentIds(departmentIds.filter(function (id) { return id !== dept.id; }));
                            }
                            else {
                                setDepartmentIds(__spreadArray(__spreadArray([], departmentIds, true), [dept.id], false));
                            }
                        }}>
                            {dept.name}
                          </div>);
                })}
                    </div>
                  </div>)}
              </div>

              <div className="form-section">
                <h3 className="section-title">Scheduling</h3>

                <div className="form-grid">
                  <div>
                    <label>Start Time *</label>
                    <input type="datetime-local" value={startDatetime} onChange={function (e) { return setStartDatetime(e.target.value); }} required/>
                  </div>

                  <div>
                    <label>Duration (minutes)</label>
                    <input type="number" value={durationMinutes} onChange={function (e) {
                return setDurationMinutes(Number(e.target.value));
            }}/>
                  </div>
                </div>
              </div>

              <div className="form-section">
               <h3 className="section-title">Meeting Access</h3>

                <div className="form-grid">
                  {(mode === "physical" || mode === "hybrid") && (<div>

                      <label>Location *</label>
                      <input value={location} onChange={function (e) { return setLocation(e.target.value); }} required/>
                    </div>)}
                  </div>

                  {(mode === "virtual" || mode === "hybrid") && (<div className="form-group">
                      <label>Select Virtual Staff</label>

                      <div className="department-chips">
                        {staff.map(function (person) {
                    var selected = virtualStaffIds.includes(person.id);
                    return (<div key={person.id} className={"chip ".concat(selected ? "chip-selected" : "")} onClick={function () {
                            if (selected) {
                                setVirtualStaffIds(virtualStaffIds.filter(function (id) { return id !== person.id; }));
                            }
                            else {
                                setVirtualStaffIds(__spreadArray(__spreadArray([], virtualStaffIds, true), [person.id], false));
                            }
                        }}>
                              {person.name}
                            </div>);
                })}
                      </div>
                    </div>)}

                </div>

              <div className="form-actions">
                <button type="button" className="secondary-btn" onClick={function () { return navigate("/admin/meetings"); }}>
                  Cancel
                </button>

                <button type="submit" className="primary-btn" onClick={function () { return navigate(/admin/meetings); }} disabled={loading}>
                  {loading ? "Creating..." : "Create Meeting"}
                </button>
              </div>
            </>)}
        </form>
      </div>

  {showSuccessModal && (<div className="modal-overlay">
    <div className="modal-card">
      <h3>✅ Meeting Created</h3>
      <p>Your meeting has been successfully created.</p>

      <div className="modal-actions">
        <button className="primary-btn" onClick={function () {
                setShowSuccessModal(false);
                navigate("/admin/meetings");
            }}>
          Go to Meetings
        </button>
      </div>
    </div>
  </div>)}

    </div>);
}
exports.default = CreateMeeting;
